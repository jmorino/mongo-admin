'use strict';


export const dbName         = state => state.database.current && state.database.current.name;
export const collectionName = state => state.collection.current && state.collection.current.name;
