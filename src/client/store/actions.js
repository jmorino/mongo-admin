'use strict';


export const getSomething = ({ commit }, payload) => {
	commit('setSomething', 42);
};
