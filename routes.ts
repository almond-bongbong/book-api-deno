import { Router } from 'https://raw.githubusercontent.com/oakserver/oak/main/mod.ts';
import UserController from './controllers/UserController.ts';
import BookController from './controllers/BookController.ts';

const userController = new UserController();
const bookController = new BookController();
const router = new Router();

router
  .post('/login', userController.login)
  .delete('/logout', userController.logout)
  .post('/book', bookController.createBook)
  .get('/book', bookController.getBooks)
  .get('/book/:id', bookController.getBook)
  .patch('/book/:id', bookController.updateBook)
  .delete('/book/:id', bookController.deleteBook);

export default router;
