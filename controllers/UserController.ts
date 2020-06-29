import {
  RouterContext,
  BodyForm,
} from 'https://raw.githubusercontent.com/oakserver/oak/main/mod.ts';
import * as bcrypt from 'https://deno.land/x/bcrypt/mod.ts';
import { getUserByEmail } from '../models/Users.ts';
import { generate } from '../utils/token.ts';

export default class UserController {
  public async login(context: RouterContext) {
    const { value } = (await context.request.body()) as BodyForm;
    const email = value.get('email');
    const password = value.get('password');

    if (email === null || password === null) {
      context.response.status = 422;
      context.response.body = { error: 'email or password required' };
      return;
    }

    try {
      const user = await getUserByEmail(email);
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        context.response.status = 401;
        context.response.body = { error: 'Unauthorized' };
        return;
      }

      const token = generate(user.userId, user.name, user.email);
      context.response.body = { token };
    } catch (e) {
      console.log(e);
    }
  }

  public logout() {}
}
