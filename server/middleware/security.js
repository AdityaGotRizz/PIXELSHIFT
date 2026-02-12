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
    // Limit requests from same API
    const limiter = rateLimit({
        max: 100, // Limit each IP to 100 requests per windowMs
        windowMs: 60 * 60 * 1000, // 1 hour
        message: 'Too many requests from this IP, please try again in an hour!'
    });
    app.use('/api', limiter);

    // 4. Data Sanitization against XSS
    app.use(xss());

    // 5. Prevent Parameter Pollution
    app.use(hpp());
};
