'use strict';

import WSError from "./WSError";


export { WSError }

export const ValidationError = WSError.extend('ValidationError', 400);
export const BadRequestError = WSError.extend('BadRequestError', 400);
export const UnauthorizedError = WSError.extend('UnauthorizedError', 401);
export const NotFoundError = WSError.extend('NotFound', 404);
export const ServerError = WSError.extend('ServerError', 500);
