import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import AppError from '../utils/AppError.js';

const prisma = new PrismaClient();

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

export const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        // Create Audit Log
        await prisma.auditLog.create({
            data: {
                action: 'USER_SIGNUP',
                resource: 'User',
                resourceId: newUser.id,
                details: JSON.stringify({ method: 'local' }),
                userId: newUser.id
            }
        });

        createSendToken(newUser, 201, res);
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1) Check if email and password exist
        if (!email || !password) {
            return next(new AppError('Please provide email and password!', 400));
        }

        // 2) Find user
        const user = await prisma.user.findUnique({ where: { email } });

        // 3) Check Account Lockout
        if (user && user.lockoutUntil && user.lockoutUntil > new Date()) {
            return next(new AppError('Account locked due to too many failed attempts. Please try again later.', 403));
        }

        // 4) Verify Password
        if (!user || !(await bcrypt.compare(password, user.password))) {
            // Increment Failed Attempts
            if (user) {
                const attempts = user.failedLoginAttempts + 1;
                const updateData = { failedLoginAttempts: attempts };

                // Lockout logic: 5 attempts
                if (attempts >= 5) {
                    updateData.lockoutUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 min lock
                }

                await prisma.user.update({
                    where: { id: user.id },
                    data: updateData
                });

                // Audit Failure
                await prisma.auditLog.create({
                    data: {
                        action: 'LOGIN_FAILED',
                        resource: 'User',
                        resourceId: user.id,
                        details: JSON.stringify({ reason: 'Invalid Credentials', attempts }),
                        userId: user.id
                    }
                });
            }
            return next(new AppError('Incorrect email or password', 401));
        }

        // 5) Reset Lockout on Success
        await prisma.user.update({
            where: { id: user.id },
            data: {
                failedLoginAttempts: 0,
                lockoutUntil: null,
                lastLoginAt: new Date()
            }
        });

        // 6) Audit Success
        await prisma.auditLog.create({
            data: {
                action: 'USER_LOGIN',
                resource: 'User',
                resourceId: user.id,
                details: JSON.stringify({ success: true, method: 'local' }),
                userId: user.id
            }
        });

        // 7) Send Token
        createSendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};

export const protect = async (req, res, next) => {
    try {
        // 1) Getting token and check of it's there
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(
                new AppError('You are not logged in! Please log in to get access.', 401)
            );
        }

        // 2) Verification token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // 3) Check if user still exists
        const currentUser = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!currentUser) {
            return next(
                new AppError(
                    'The user belonging to this token does no longer exist.',
                    401
                )
            );
        }

        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
        next();
    } catch (err) {
        next(err);
    }
};
