'use strict';

import SimpleSchema from 'simpl-schema';
import { ValidationError } from './errors';


// setup SimpleSchema to transform default
// validation errors into custom ValidationError objects
SimpleSchema.defineValidationErrorTransform(error => new ValidationError(error.message, error.details));


export { SimpleSchema };


export const validate = (data, schemaDef) => {
	const schema = new SimpleSchema(schemaDef);
	const cleanData = schema.clean(data, { mutate: false });
	schema.validate(cleanData);
	return cleanData;
};

//=================================================================================================================

export const cleanBeforeInsert = (data, schema, options) => {
	return cleanBeforeMongoDBOperation(data, schema, { isInsert: true, isUpdate: false, isUpsert: false }, options);
};

//=================================================================================================================

export const cleanBeforeUpsert = (data, schema, options) => {
	return cleanBeforeMongoDBOperation(data, schema, { isInsert: false, isUpdate: false, isUpsert: true }, options);
};

//=================================================================================================================

export const cleanBeforeUpdate = (data, schema, options) => {
	return cleanBeforeMongoDBOperation(data, schema, { isInsert: false, isUpdate: true, isUpsert: false }, options);
};

//=================================================================================================================

export const validateBeforeInsert = (data, schema, options) => {
	return validateBeforeMongoDBOperation(data, schema, { isInsert: true, isUpdate: false, isUpsert: false }, options);
};

//=================================================================================================================

export const validateBeforeUpsert = (data, schema, options) => {
	return validateBeforeMongoDBOperation(data, schema, { isInsert: false, isUpdate: false, isUpsert: true }, options);
};

//=================================================================================================================

export const validateBeforeUpdate = (data, schema, options) => {
	return validateBeforeMongoDBOperation(data, schema, { isInsert: false, isUpdate: true, isUpsert: false }, options);
};


//=============================================================================
//=========================== Private Helpers =================================
//=============================================================================


const cleanBeforeMongoDBOperation = (data, schema, context, { clone = false } = {}) => {
	return schema.clean(data, {
		mutate: !clone,
		extendAutoValueContext: context,
	});
};

//=================================================================================================================

const validateBeforeMongoDBOperation = (data, schema, context, options) => {
	const doc = cleanBeforeMongoDBOperation(data, schema, context, options);
	schema.validate(doc, {
		modifier: context.isUpdate || context.isUpsert,
		upsert: context.isUpsert,
		extendedCustomContext: context,
	});
	return doc;
};
