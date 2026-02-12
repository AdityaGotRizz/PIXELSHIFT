import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { configureSecurityMiddleware } from './middleware/security.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();

// 1. Security Middleware (Helmet, CORS, Rate Limit, XSS, HPP)
configureSecurityMiddleware(app);

// 2. Logging (Morgan piped to Winston)
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat, {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}));

// 3. Body Parser (limit body size to prevent DoS)
app.use(express.json({ limit: '10kb' }));

// Routes
import authRouter from './routes/authRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import globalErrorHandler from './controllers/errorController.js';
import AppError from './utils/AppError.js';

import privacyRouter from './routes/privacyRoutes.js';

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/privacy', privacyRouter);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'MarkGadzhi API is Online 🚀' });
});

// 404 Handler
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error Handler
app.use(globalErrorHandler);

export default app;
