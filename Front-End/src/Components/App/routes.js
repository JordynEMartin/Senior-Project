
import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

// Static routes
import Home from 'Routes/Home';
import SignUp from 'Routes/SignUp';
import Login from 'Routes/Login';

class Routes extends React.Component {
	render () {
		const { history } = this.props;

		return (
			<ConnectedRouter history={history}>
				<Switch>
					<Route exact path="/" render={() => (<Home />)} />
					<Route path="/signup" render={() => (<SignUp />)} />
					<Route path="/login" render={() => (<Login />)} />
					<Route render={() => (<div>Page not found!</div>)} />
				</Switch>
			</ConnectedRouter>
		);
	}
}

export default Routes;
