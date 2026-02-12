import winston from 'winston';

const { combine, timestamp, json, printf, colorize, align } = winston.format;

// Define custom format for development
const devFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

// Redaction of sensitive keys
const sensitiveKeys = ['password', 'token', 'authorization', 'creditContext'];
const redactSensitiveData = winston.format((info) => {
    if (typeof info.message === 'object') {
        const redact = (obj) => {
            for (const key in obj) {
                if (sensitiveKeys.includes(key.toLowerCase())) {
                    obj[key] = '[REDACTED]';
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    redact(obj[key]);
                }
            }
        };
        redact(info.message);
    }
    return info;
});

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        redactSensitiveData(),
        json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: combine(
            colorize({ all: true }),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            align(),
            devFormat
        ),
    }));
}

export default logger;
