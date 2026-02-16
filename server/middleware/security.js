import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const xss = require('xss-clean');

/**
 * Configure core security middleware for the application
 * @param {import('express').Application} app - Express application instance
 */
export const configureSecurityMiddleware = (app) => {
    // 1. Set security HTTP headers
    app.use(helmet());

    // 2. Enable CORS with restrictive options
    // In production, allow configured origins only
    const corsOptions = {
        origin: process.env.NODE_ENV === 'production'
            ? process.env.FRONTEND_URL || 'http://localhost:5173'
            : '*', // Allow all in dev
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    };
    app.use(cors(corsOptions));

    // 3. Rate Limiting

    // General API Limiter (300 requests per 15 mins)
    const apiLimiter = rateLimit({
        max: 300,
        windowMs: 15 * 60 * 1000,
        message: 'Too many requests from this IP, please try again in 15 minutes!',
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });
    app.use('/api', apiLimiter);

    // Strict Auth Limiter (10 requests per 15 mins) - Brute force protection
    const authLimiter = rateLimit({
        max: 10,
        windowMs: 15 * 60 * 1000,
        message: 'Too many login attempts, please try again in 15 minutes!',
        standardHeaders: true,
        legacyHeaders: false,
    });
    app.use('/api/v1/auth', authLimiter);

    // 4. Data Sanitization against XSS
    app.use(xss());

    // 5. Prevent Parameter Pollution
    app.use(hpp());
};
