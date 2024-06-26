import { z } from 'zod'

export const schema = z.object({
  _id: z.string(),
  email: z.string().email(),
  name: z.string(),
  // image: z.string().optional(),
  // mobile: z.number().optional(),
  // address: z.string().optional(),
  // bio: z.string().optional(),
  // password: z.string(),
  // confirmed: z.boolean(),
  // blocked: z.boolean(),
  // resetPasswordToken: z.string().optional(),
  // resetPasswordExpire: z.bigint().optional(),
  // createdAt: z.date(),
  // updatedAt: z.date(),
  // role: z.string(),
  // roleId: z.string(),
});