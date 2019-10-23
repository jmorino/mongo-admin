'use strict';

import { NotFoundError } from '../utils/errors';


export const catchUnhandled = () => { throw new NotFoundError() };
