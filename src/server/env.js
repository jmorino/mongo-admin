'use strict';


export const DEVELOPMENT = 'development';
export const STAGING     = 'staging';
export const PRODUCTION  = 'production';


let env = process.env.NODE_ENV;
if (!env) {
	env = DEVELOPMENT;
	console.log('[ENV]', `No environment defined, falling back to "${env}"`);
}

if ([DEVELOPMENT, STAGING, PRODUCTION].indexOf(env) === -1) {
	console.log('[ENV]', `Unsupported environment ${env}`);
	throw new Error(`Unsupported environment ${env}`);
}


export { env };
export const isDebug = !!process.env.NODE_DEBUG || env === DEVELOPMENT;
