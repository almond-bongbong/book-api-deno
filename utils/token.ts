import {
  makeJwt,
  setExpiration,
  Jose,
} from 'https://deno.land/x/djwt/create.ts';
import {
  validateJwt,
  JwtValidation,
} from 'https://deno.land/x/djwt/validate.ts';

const key = 'markzzang';

const header: Jose = {
  alg: 'HS256',
  typ: 'JWT',
};

export function generate(userId: string, name: string, email: string): string {
  return makeJwt({
    header,
    payload: {
      iss: 'cmlee',
      exp: setExpiration(new Date().getTime() + 6000000),
      userId,
      name,
      email,
    },
    key,
  });
}

export function validate(token: string): Promise<JwtValidation> {
  return validateJwt(token, key);
}
