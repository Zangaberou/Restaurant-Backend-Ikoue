const bcrypt = require('bcrypt');
const { registerSchema, loginSchema } = require('../validators/authSchema');
const userRepo = require('../repositories/userRepository');

exports.register = async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { errors?: any; message?: string; user?: { id: string; username: any; email: any; role: any; }; }): void; new(): any; }; }; }) => {
  const parse = registerSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ errors: parse.error.errors });

  const { username, email, password, role } = parse.data;
  if (userRepo.findByEmail(email)) return res.status(400).json({ message: 'Email déjà utilisé' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    id: Date.now().toString(),
    username,
    email,
    password: hashedPassword,
    role: role || 'user',
    favorites: []
  };
  userRepo.create(user);
  res.status(201).json({ message: 'Inscription réussie', user: { id: user.id, username, email, role: user.role } });
};

exports.login = async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { errors?: any; message?: string; }): any; new(): any; }; }; json: (arg0: { message: string; user: { id: any; username: any; role: any; }; }) => void; }) => {
  const parse = loginSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ errors: parse.error.errors });

  const { email, password } = parse.data;
  const user = userRepo.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Identifiants invalides' });

  res.json({ message: 'Connexion réussie', user: { id: user.id, username: user.username, role: user.role } });
};
