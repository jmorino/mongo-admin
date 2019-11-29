'use strict';


export const dbName         = state => state.database.current && state.database.current.name;
export const collectionName = state => state.collection.current && state.collection.current.name;

export const hasDocumentChanged = state => state.document.current && state.document.current !== state.document.original;