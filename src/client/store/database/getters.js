'use strict';


export const loading = state => state.loading;
export const error = state => state.loadError;

export const name = state => state.name;
export const stats = state => state.stats || {};