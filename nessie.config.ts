import { ClientMySQL } from 'https://deno.land/x/nessie/mod.ts';
import { config as envConfig } from 'https://deno.land/x/dotenv/mod.ts';

const env = envConfig();

/** These are the default config options. */
const clientOptions = {
  migrationFolder: './db/migrations',
  seedFolder: './db/seeds',
};

export const connectionOptions = {
  hostname: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  db: env.DB_DATABASE,
};

/** Select one of the supported clients */
const clientMySql = new ClientMySQL(clientOptions, connectionOptions);

/** This is the final config object */
const config = {
  client: clientMySql,
  // Defaults to false, if you want the query builder exposed in migration files, set this to true.
  exposeQueryBuilder: true,
};

export default config;
