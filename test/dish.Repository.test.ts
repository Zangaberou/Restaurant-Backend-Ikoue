const dishRepo = require('../repositories/dishRepository');
const { dishes } = require('../data');
import{describe, it, expect} from 'bun:test';

describe('dishRepository', () => {
  beforeEach(() => {
    dishes.length = 0;
  });	

  it('devrait créer un plat', () => {
    const dish = { id: 'd1', name: 'Ndolé', price: 3500 };
    dishRepo.create(dish);
    expect(dishes).toContainEqual(dish);
  });

  it('devrait retrouver un plat par ID', () => {
    const dish = { id: 'd2', name: 'Fufu' };
    dishRepo.create(dish);
    const found = dishRepo.findById('d2');
    expect(found).toEqual(dish);
  });

  it('devrait retourner tous les plats', () => {
    dishRepo.create({ id: 'd3', name: 'Tô' });
    dishRepo.create({ id: 'd4', name: 'Riz sauce arachide' });
    const all = dishRepo.findAll();
    expect(all.length).toBe(2);
  });

  it('devrait retrouver plusieurs plats par ID', () => {
    const d1 = { id: 'd5', name: 'Koki' };
    const d2 = { id: 'd6', name: 'Gombo' };
    dishRepo.create(d1);
    dishRepo.create(d2);
    const result = dishRepo.findManyByIds(['d5', 'd6']);
    expect(result).toEqual([d1, d2]);
  });
});
