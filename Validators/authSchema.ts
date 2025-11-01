const { z } = require('zod');

exports.registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'user']).optional()
});

exports.loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
