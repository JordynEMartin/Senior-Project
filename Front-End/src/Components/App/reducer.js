
const initialState = {
	isInitialized: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'INITIALIZE':
			return {
				...state,
				isInitialized: true
			};
		default:
			return state;
	}
};
