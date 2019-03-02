
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isInitializedSelector } from './selectors';

import './index.css';

class App extends Component {
	render () {
		const { children, isInitialized } = this.props;

		return isInitialized ? (
			<div>
				{children}
			</div>
		) : null;
	}
}

App.propTypes = {
	isInitialized: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isInitialized: isInitializedSelector(state)
});

export default connect(mapStateToProps)(App);
