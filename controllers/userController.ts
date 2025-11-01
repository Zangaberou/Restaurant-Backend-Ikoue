const userRepo = require('../repositories/userRepository');
const dishRepo = require('../repositories/dishRepository');

exports.addFavorite = (req: { params: { userId: any; dishId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; json: (arg0: { message: string; favorites: any; }) => void; }) => {
  const user = userRepo.findById(req.params.userId);
  const dish = dishRepo.findById(req.params.dishId);
  if (!user || !dish) return res.status(404).json({ message: 'Utilisateur ou plat introuvable' });

  userRepo.addFavorite(user.id, dish.id);
  res.json({ message: 'Ajouté aux favoris', favorites: user.favorites });
};

exports.getFavorites = (req: { params: { userId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; json: (arg0: any) => void; }) => {
  const user = userRepo.findById(req.params.userId);
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

  const favorites = dishRepo.findManyByIds(user.favorites);
  res.json(favorites);
};
