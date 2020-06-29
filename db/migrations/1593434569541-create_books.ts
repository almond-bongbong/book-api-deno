import { Migration } from 'https://deno.land/x/nessie/mod.ts';
import { Schema } from 'https://deno.land/x/nessie/qb.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import * as bcrypt from 'https://deno.land/x/bcrypt/mod.ts';

/** Runs on migrate */
export const up: Migration<Schema> = async ({ queryBuilder }) => {
  queryBuilder.create('Books', (table) => {
    table.id();
    table.string('title', 255).notNullable();
    table.string('message', 255).notNullable();
    table.string('author', 255).notNullable();
    table.string('url', 255).notNullable();
    table.string('ownerId', 255).notNullable();
    table.date('deletedAt');
    table.timestamps();
  });

  return queryBuilder.query;
};

/** Runs on rollback */
export const down: Migration<Schema> = ({ queryBuilder }) => {
  return queryBuilder.drop('Books');
};
