'use strict';

export const arrayToObj = (array, key) => array.reduce((obj, item) => {
	obj[item[key]] = item;
	return obj;
}, {});

//=================================================================================================================

export const objToArray = obj => Object.keys(obj).map(key => obj[key]);

//=================================================================================================================

export const deepCopy = obj => {
	const clone = Array.isArray(obj) ? [] : {};
	for (let key in obj) {
		const value = obj[key];
		clone[key] = value !== null && typeof(value) === 'object' ? deepCopy(value) : value;
	}
	return clone;
};

//=================================================================================================================

export const pick = (obj, keys) => keys.reduce((copy, key) => {
	copy[key] = obj[key];
	return copy;
}, {});

//=================================================================================================================

export const omit = (obj, keys) => pick(obj, Object.keys(obj).filter(key => keys.indexOf(key) === -1));
