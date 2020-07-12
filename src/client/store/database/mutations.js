'use strict';


export const   setLoading = state => { state.loading = true  };
export const unsetLoading = state => { state.loading = false };
export const   setLoaded  = state => { state.loaded  = true  };
export const unsetLoaded  = state => { state.loaded  = false };

export const setLoadError = (state, err = null) => { state.loadError = err };

//=================================================================================================================

export const setName = (state, dbName = null) => { state.name = dbName };

//=================================================================================================================

export const setDatabaseData = (state, { stats = {} }) => { state.stats = stats };
