import Dex from 'https://deno.land/x/dex/mod.ts';
import client from './config.ts';

const dex = Dex({ client: 'mysql' });

export interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export async function getUserByEmail(email: string): Promise<User> {
  const selectQuery = dex
    .queryBuilder()
    .select()
    .from('Users')
    .where({ email })
    .toString();
  const { rows } = await client.execute(selectQuery);

  if (!rows) throw new Error();
  if (rows.length !== 1) throw new Error();
  return rows[0];
}
