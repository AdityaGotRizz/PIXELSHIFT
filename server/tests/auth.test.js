import request from 'supertest';
import app from '../app.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Auth Integration', () => {
    beforeAll(async () => {
        // Cleanup database
        await prisma.auditLog.deleteMany();
        await prisma.user.deleteMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    const testUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!'
    };

    it('should register a new user with valid data', async () => {
        const res = await request(app).post('/api/v1/auth/signup').send(testUser);
        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toEqual('success');
        expect(res.body.token).toBeDefined();
    });

    it('should prevent login with wrong password', async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: testUser.email,
            password: 'WrongPassword123!'
        });
        expect(res.statusCode).toEqual(401);
    });

    it('should validate input data', async () => {
        const res = await request(app).post('/api/v1/auth/signup').send({
            name: 'A', // Too short
            email: 'invalid-email',
            password: '123'
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Invalid input data');
    });

    it('should lockout user after 5 failed attempts', async () => {
        // We already failed once in previous test
        for (let i = 0; i < 4; i++) {
            await request(app).post('/api/v1/auth/login').send({
                email: testUser.email,
                password: 'WrongPassword123!'
            });
        }

        // 6th attempt should be locked out
        const res = await request(app).post('/api/v1/auth/login').send({
            email: testUser.email,
            password: 'WrongPassword123!'
        });

        expect(res.statusCode).toEqual(403);
        expect(res.body.message).toContain('Account locked');
    });
});
