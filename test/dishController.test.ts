const request = require('supertest');
const app = require('../index');
import{describe, it, expect} from 'bun:test';

describe('Dish Routes with Zod Validation', () => {
  it('should reject dish with negative price', async () => {
    const res = await request(app).post('/dishes').send({
      name: 'Poisson braisé',
      description: 'Délicieux mais cher',
      price: -5000,
      publishedBy: 'admin123'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('should publish a valid dish', async () => {
    const res = await request(app).post('/dishes').send({
      name: 'Poisson braisé',
      description: 'Délicieux plat africain',
      price: 5000,
      publishedBy: 'admin123'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.dish).toHaveProperty('name', 'Poisson braisé');
  });

  it('should list all dishes', async () => {
    const res = await request(app).get('/dishes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
 