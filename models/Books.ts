import Dex from 'https://deno.land/x/dex/mod.ts';
import client from './config.ts';

const dex = Dex({ client: 'mysql' });

export interface Book {
  id: number;
  title: string;
  message: string;
  author: string;
  url: string;
  ownerId: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

interface BookRawData {
  title: string;
  message: string;
  author: string;
  url: string;
}

export async function createBook(
  book: BookRawData,
  userId: string
): Promise<void> {
  const insertQuery = dex
    .queryBuilder()
    .insert([{ ...book, ownerId: userId }])
    .into('Books')
    .toString();
  await client.execute(insertQuery);
}

export async function getBooksByOwnerId(ownerId: string): Promise<Book[]> {
  const selectQuery = dex
    .queryBuilder()
    .select()
    .from('Books')
    .where({ ownerId })
    .toString();
  const { rows } = await client.execute(selectQuery);

  if (!rows) throw new Error();
  return rows;
}

export async function getBookById(
  bookId: number,
  ownerId: string
): Promise<Book> {
  const selectQuery = dex
    .queryBuilder()
    .select()
    .from('Books')
    .where({ id: bookId, ownerId })
    .toString();
  const { rows } = await client.execute(selectQuery);

  if (!rows) throw new Error();
  if (rows.length !== 1) throw new Error();
  return rows[0];
}
