import { z } from 'zod';

/**
 * Higher-order function to validate request body against a Zod schema
 * @param {z.ZodSchema} schema - The Zod schema to validate against
 */
export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid input data',
                errors: error.errors.map(e => ({
                    field: e.path.join('.'),
                    message: e.message
                }))
            });
        }
        next(error);
    }
};

// --- Auth Schemas ---

export const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50),
    email: z.string().email('Invalid email address'),
    password: z.string()
        .min(12, 'Password must be at least 12 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string().optional()
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1)
});

// --- Project Schemas ---

export const projectSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(100),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    status: z.enum(['PLANNING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD']).optional(),
    deploymentUrl: z.string().url('Invalid deployment URL').optional().or(z.literal('')),
    repoUrl: z.string().url('Invalid repository URL').optional().or(z.literal('')),
    techStack: z.array(z.string()).optional()
});

export const updateProjectSchema = z.object({
    title: z.string().min(3).max(100).optional(),
    description: z.string().min(10).optional(),
    status: z.enum(['PLANNING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD']).optional(),
    deploymentUrl: z.string().url().optional().or(z.literal('')),
    repoUrl: z.string().url().optional().or(z.literal('')),
    techStack: z.array(z.string()).optional()
}).refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update"
});
