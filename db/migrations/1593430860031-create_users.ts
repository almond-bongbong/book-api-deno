import { Migration } from 'https://deno.land/x/nessie/mod.ts';
import { Schema } from 'https://deno.land/x/nessie/qb.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import * as bcrypt from 'https://deno.land/x/bcrypt/mod.ts';

/** Runs on migrate */
export const up: Migration<Schema> = async ({ queryBuilder }) => {
  queryBuilder.create('Users', (table) => {
    table.string('userId', 36).primary().notNullable();
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('password', 255).notNullable();
    table.date('deletedAt');
    table.timestamps();
  });

  const userId = v4.generate();
  const name = 'cmlee';
  const email = 'dlcndaks12@naver.com';
  const hashed = await bcrypt.hash('1234');

  queryBuilder.queryString(
    `INSERT INTO Users VALUES('${userId}', '${name}', '${email}', '${hashed}', null, DEFAULT, DEFAULT)`
  );

  return queryBuilder.query;
};

/** Runs on rollback */
export const down: Migration<Schema> = ({ queryBuilder }) => {
  return queryBuilder.drop('Users');
};
