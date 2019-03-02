
import { INITIALIZE, ASYNC_MODULE_LOADED } from './constants';

const initializeAction = () => ({
	type: INITIALIZE
});

const asyncModuleLoadedAction = (name) => ({
	type: ASYNC_MODULE_LOADED,
	payload: {
		name
	}
});

export {
	initializeAction,
	asyncModuleLoadedAction
};
