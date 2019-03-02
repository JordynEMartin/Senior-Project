
import React, { Component } from 'react';

import './style.css';

class Layout extends Component {
	render () {
		const { children } = this.props;

		return (
			<div className="App">
				<header className="App-header">
					{children}
				</header>
			</div>
		);
	}
}

export default Layout;
