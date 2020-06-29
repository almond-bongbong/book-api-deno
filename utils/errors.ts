export class UnauthorizedError extends Error {
  status = 401;
  message = 'Unauthorized';
}

export class AllParametersRequired extends Error {
  status = 400;
  message = 'All parameters required';
}
