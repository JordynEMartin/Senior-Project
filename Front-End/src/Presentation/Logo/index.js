
import React, { Component } from 'react';

import logoImg from './logo.svg';

class Logo extends Component {
	render () {
		return (
			<img src={logoImg} className="App-logo" alt="logo" />
		);
	}
}

export default Logo;
