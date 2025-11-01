const { dishSchema } = require('../validators/dishSchema');
const dishRepo = require('../repositories/dishRepository');

exports.createDish = (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { errors?: any; message?: string; dish?: any; }): void; new(): any; }; }; }) => {
  const parse = dishSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ errors: parse.error.errors });

  const dish = { id: Date.now().toString(), ...parse.data };
  dishRepo.create(dish);
  res.status(201).json({ message: 'Plat publié', dish });
};

exports.getAllDishes = (req: any, res: { json: (arg0: any) => void; }) => {
  res.json(dishRepo.findAll());
};
