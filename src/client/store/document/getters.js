'use strict';

export const loading = state => state.loading;
export const error = state => state.loadError;

export const db = state => state.db;
export const collection = state => state.collection;
export const id = state => state.id;

export const content = state => state.draft.original;
export const draft = state => state.draft.modified;

export const hasDocumentChanged = state => state.id === null || state.draft.original !== state.draft.modified;

