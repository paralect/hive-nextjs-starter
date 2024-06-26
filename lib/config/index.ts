import { z } from 'zod';

import { validateConfig } from './validate';

/**
 * Specify your environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
const schema = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  IS_DEV: z.preprocess(() => process.env.APP_ENV === 'development', z.boolean()),
  PORT: z.coerce.number().optional().default(3001),
  MONGO_URI: z.string(),
  MONGO_DB_NAME: z.string(),
});

type Config = z.infer<typeof schema>;

const config = validateConfig<Config>(schema);

export default config;