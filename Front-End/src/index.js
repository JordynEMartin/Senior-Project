
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store, { history } from 'Components/App/store';
import Routes from 'Components/App/routes';

import App from 'Components/App';

ReactDOM.render(
	<Provider store={store}>
		<App>
			<Routes history={history} />
		</App>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
