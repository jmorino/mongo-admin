'use strict';

export const loading = state => state.loading;
export const error = state => state.loadError;

export const db = state => state.db;
export const name = state => state.name;

export const stats = state => state.stats || {};
export const indexes = state => state.indexes || {};
export const fields = state => state.fields || [];
export const rootFields = state => state.rootFields || [];
