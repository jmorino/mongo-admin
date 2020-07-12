'use strict';

import { state } from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';


export const namespaced = true;
export { state, getters, mutations, actions };
