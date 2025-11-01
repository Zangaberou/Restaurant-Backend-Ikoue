const request = require('supertest');
const app = require('../index');
const { users, dishes } = require('../data');
import{describe, it, expect} from 'bun:test';

describe('Favoris utilisateur', () => {
  let userId: number;
  let dishId: string;

  beforeAll(async () => {
    // Créer un utilisateur
    const userRes = await request(app).post('/auth/register').send({
      username: 'zangaUser',
      email: 'zanga@favoris.com',
      password: 'securepass',
      role: 'user'
    });
    userId = userRes.body.user.id;

    // Créer un plat
    const dishRes = await request(app).post('/dishes').send({
      name: 'Ndolé',
      description: 'Plat camerounais aux feuilles amères',
      price: 3500,
      publishedBy: 'admin123'
    });
    dishId = dishRes.body.dish.id;
  });

  it('devrait ajouter un plat aux favoris', async () => {
    const res = await request(app).post(`/users/favorites/${userId}/${dishId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.favorites).toContain(dishId);
  });

  it('devrait retourner les plats favoris de l’utilisateur', async () => {
    const res = await request(app).get(`/users/favorites/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name', 'Ndolé');
  });

  it('devrait refuser un ajout si le plat est introuvable', async () => {
    const res = await request(app).post(`/users/favorites/${userId}/fakeDishId`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/introuvable/);
  });

  it('devrait refuser un ajout si l’utilisateur est introuvable', async () => {
    const res = await request(app).post(`/users/favorites/fakeUserId/${dishId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/introuvable/);
  });
});
