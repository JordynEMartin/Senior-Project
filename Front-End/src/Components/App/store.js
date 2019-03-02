
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { initializeAction, asyncModuleLoadedAction } from './actions';
import { addHandler } from 'lib/async-loader';
import appReducer from './reducer';

const reducers = {};

const history = createBrowserHistory();

const createReducer = asyncReducers => (
	connectRouter(history)(
		combineReducers({
			appReducer,
			...asyncReducers
		})
	)
);

const injectReducer = (store, name, reducer) => {
	reducers[name] = reducer;
	store.replaceReducer(createReducer(reducers));
};

const store = createStore(
	connectRouter(history)(createReducer()),
	composeWithDevTools(
		applyMiddleware(
			routerMiddleware(history)
		)
	)
);

addHandler(
	_module => {
		const { name, reducer } = _module;

		if (reducer) {
			injectReducer(store, name, reducer);
		}

		store.dispatch(asyncModuleLoadedAction(name));
	}
);

store.dispatch(initializeAction());

export {
	history,
	injectReducer
};

export default store;
