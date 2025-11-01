const userRepo = require('../repositories/userRepository');
const { users } = require('../data');

describe('userRepository', () => {
  beforeEach(() => {
    users.length = 0; // Réinitialise le tableau en mémoire
  });

  it('devrait créer un utilisateur', () => {
    const user = {
      id: '1',
      username: 'zanga',
      email: 'zanga@example.com',
      password: 'hashedpass',
      role: 'user',
      favorites: []
    };
    userRepo.create(user);
    expect(users).toContainEqual(user);
  });

  it('devrait trouver un utilisateur par email', () => {
    const user = { id: '2', email: 'test@example.com', favorites: [] };
    userRepo.create(user);
    const found = userRepo.findByEmail('test@example.com');
    expect(found).toEqual(user);
  });

  it('devrait ajouter un plat aux favoris', () => {
    const user = { id: '3', email: 'fav@example.com', favorites: [] };
    userRepo.create(user);
    userRepo.addFavorite('3', 'dish123');
    expect(user.favorites).toContain('dish123');
  });

  it('devrait retourner les favoris d’un utilisateur', () => {
    const user = { id: '4', email: 'multi@example.com', favorites: ['dishA', 'dishB'] };
    userRepo.create(user);
    const favs = userRepo.getFavorites('4');
    expect(favs).toEqual(['dishA', 'dishB']);
  });

  it('devrait retourner undefined si l’utilisateur n’existe pas', () => {
    const favs = userRepo.getFavorites('999');
    expect(favs).toEqual([]);
  });
});
