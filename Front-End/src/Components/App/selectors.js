
import _ from 'lodash';

const isInitializedSelector = state => _.get(state, 'appReducer.isInitialized', false);

export {
	isInitializedSelector
};
