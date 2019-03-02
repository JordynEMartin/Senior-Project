
import _ from 'lodash';

const _modules = {};
const _handlers = [];

const _actionNotLoaded = { type: 'ASYNC_ACTION_NOT_LOADED' };

function addHandler (func) {
	_handlers.push(func);
}

/**
 * Asynchronous loader for wrapping code-split imports, handle the promise, and
 * 	if present, combine the reducer in redux.  Module is passed to a handler
 * 	if one is provided.
 * @param {function} loader - Function calling import, returns Promise
 * @param {function} [handler] - Optional handler for additional processing
 * 	of module beyond those previously registered
 */
async function asyncLoader (loader, handler) {
	const module = await loader();
	const modDefault = module.default || {};
	const { name } = modDefault;

	_modules[name] = modDefault;

	_handlers.forEach(func => func(modDefault));

	if (handler) {
		handler(modDefault);
	}
};

/**
 * Generic getter function to pull in functions and components provided by
 * an external module.  Note that the function returned will serve as a NoOp
 * until the real function is loaded.
 * @param {string} moduleName - Name as provided by the module during import
 * @param {string} funcType - Usually selector, action, component but may be
 * 	anything the module itself provides.
 * @param {string} funcName - Name of function or component
 * @param {*} [defaultReturn=null] - Value returned before function is loaded
 */
const importFromModule = (moduleName, funcType, funcName, defaultReturn = null) => {
	let func;

	return (...args) => {
		if (func) {
			return func(...args);
		}

		func = _.get(_modules, [moduleName, `${funcType}s`, funcName]);

		if (func) {
			return func(...args);
		}

		return defaultReturn;
	};
};

/**
 * Convenience function to get selectors from external modules.  Uses
 * `importFromModule`.
 * @param {string} moduleName
 * @param {string} selectorName
 */
const importSelector = (moduleName, selectorName) => importFromModule(
	moduleName,
	'selector',
	selectorName
);

/**
 * Convenience function to get actions from external modules.  Uses
 * `importFromModule`.
 * @param {string} moduleName
 * @param {string} actionName
 */
const importAction = (moduleName, actionName) => importFromModule(
	moduleName,
	'action',
	actionName,
	_actionNotLoaded
);

/**
 * Convenience function to get conmponents from external modules.  Uses
 * `importFromModule`.
 * @param {string} moduleName
 * @param {string} funcName
 */
const importComponent = (moduleName, componentName) => importFromModule(
	moduleName,
	'component',
	componentName
);

/**
 * @param {string} moduleName
 */
const isLoaded = moduleName => !!_modules[moduleName];

export {
	addHandler,
	asyncLoader,
	importFromModule,
	importSelector,
	importAction,
	importComponent,
	isLoaded
};
