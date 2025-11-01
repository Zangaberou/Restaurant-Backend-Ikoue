const request = require('supertest');
const app = require('../index');
import{describe, it, expect} from 'bun:test';

describe('Auth Routes with Zod Validation', () => {
  it('should reject registration with invalid email', async () => {
    const res = await request(app).post('/auth/register').send({
      username: 'zanga',
      email: 'invalid-email',
      password: 'securepass',
      role: 'user'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('should register a valid user', async () => {
    const res = await request(app).post('/auth/register').send({
      username: 'zanga',
      email: 'zanga@example.com',
      password: 'securepass',
      role: 'user'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('email', 'zanga@example.com');
  });

  it('should reject login with wrong password', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'zanga@example.com',
      password: 'wrongpass'
    });
    expect(res.statusCode).toBe(401);
  });

  it('should login with correct credentials', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'zanga@example.com',
      password: 'securepass'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty('username', 'zanga');
  });
});
