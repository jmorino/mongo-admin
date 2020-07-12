'use strict';


export const formatCollection = ({ rootFields, fields, stats }) => {
	const { indexDetails, indexSizes, ...collectionStats } = stats;
	const indexes = Object.keys(indexDetails).map(id => formatCollectionIndex(indexDetails[id], indexSizes[id]));

	return {
		stats: collectionStats,
		indexes,
		rootFields,
		fields,
	}
};

//=============================================================================
//=========================== Internal Helpers ================================
//=============================================================================


const formatCollectionIndex = (index, size) => {
	const { v, key, name, ns, ...details } = JSON.parse(index.metadata.infoObj);
	const columns = Object.keys(key).map(k => ({ key: k, value: key[k] > 0 ? 'ASC' : 'DESC' }));
	const attributes = Object.keys(details).map(key => ({ key, value: details[key] }));

	return { name, columns, size, attributes };
};
