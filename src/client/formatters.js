'use strict';

export const size = size => {
	let factor = 0;
	while (size >= 1000) { size /= 1024, ++factor }
	const value = (Math.round(size * 10) / 10).toLocaleString();
	const unit = ['octets','ko','Mo','Go','To'][factor];

	return `${value} ${unit}`;
};
