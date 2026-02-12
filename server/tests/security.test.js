import request from 'supertest';
import app from '../app.js';

describe('Security Middleware', () => {
    it('should set security headers (Helmet)', async () => {
        const res = await request(app).get('/api/health');
        expect(res.headers['x-dns-prefetch-control']).toBeDefined();
        expect(res.headers['x-frame-options']).toBeDefined();
        expect(res.headers['strict-transport-security']).toBeDefined();
        expect(res.headers['content-security-policy']).toBeDefined();
    });

    it('should have CORS enabled', async () => {
        const res = await request(app).get('/api/health');
        expect(res.headers['access-control-allow-origin']).toBeDefined();
    });

    it('should apply rate limiting', async () => {
        // Evaluate if rate limiter headers are present
        const res = await request(app).get('/api/health');
        expect(res.headers['x-ratelimit-limit']).toBeDefined();
        expect(res.headers['x-ratelimit-remaining']).toBeDefined();
    });
});
