const { z } = require('zod');

exports.dishSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  price: z.number().positive(),
  publishedBy: z.string()
});
