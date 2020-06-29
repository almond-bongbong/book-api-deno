import {
  RouterContext,
  BodyForm,
} from 'https://raw.githubusercontent.com/oakserver/oak/main/mod.ts';
import { createBook, getBookById, getBooksByOwnerId } from '../models/Books.ts';
import { getUserIdFromAuthorization } from '../utils/auth.ts';
import { AllParametersRequired } from '../utils/errors.ts';

export default class BookController {
  public async createBook(context: RouterContext) {
    const userId = await getUserIdFromAuthorization(context);
    const { value } = (await context.request.body()) as BodyForm;
    const title = value.get('title');
    const message = value.get('message');
    const author = value.get('author');
    const url = value.get('url');

    if (title === null || message === null || author === null || url === null) {
      throw new AllParametersRequired();
    }

    await createBook({ title, message, author, url }, userId);
    context.response.body = 'createBook';
  }

  public async getBooks(context: RouterContext) {
    const userId = await getUserIdFromAuthorization(context);
    context.response.body = await getBooksByOwnerId(userId);
  }

  public async getBook(context: RouterContext) {
    const userId = await getUserIdFromAuthorization(context);
    const bookId = Number(context.params?.id) || null;
    if (bookId === null) throw new Error('Invalid Request');

    context.response.body = await getBookById(bookId, userId);
  }

  public updateBook() {}
  public deleteBook() {}
}
