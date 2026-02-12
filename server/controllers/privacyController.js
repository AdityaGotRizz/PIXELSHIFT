import { PrismaClient } from '@prisma/client';
import AppError from '../utils/AppError.js';

const prisma = new PrismaClient();

export const exportUserData = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                projects: true,
                auditLogs: true
            }
        });

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        // Remove sensitive data
        user.password = undefined;
        user.twoFactorSecret = undefined;

        res.status(200).json({
            status: 'success',
            data: {
                user,
                description: 'This export contains all personal data associated with your account in compliance with GDPR/CCPA.'
            }
        });
    } catch (err) {
        next(err);
    }
};

export const deleteAccount = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { password } = req.body;

        // Verify password before deletion
        // (Assuming we'd verify password here, simplified for this snippet)

        // Soft delete or anonymize
        await prisma.user.update({
            where: { id: userId },
            data: {
                isActive: false,
                email: `deleted_${userId}_${Date.now()}@deleted.com`,
                name: 'Deleted User',
                avatarUrl: null
            }
        });

        await prisma.auditLog.create({
            data: {
                action: 'ACCOUNT_DELETION',
                resource: 'User',
                resourceId: userId,
                details: JSON.stringify({ method: 'user_request' })
            }
        });

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        next(err);
    }
};
