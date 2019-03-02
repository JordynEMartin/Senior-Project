
import React from 'react';
import { asyncLoader } from 'lib/async-loader';

/**
 * Wrapper for `asyncLoader`, rendering the component if provided by the
 * module.  If not, loads everything else as usual.
 */
class AsyncProvider extends React.Component {
	constructor (props) {
		super(props);

		this._component = null;

		this.state = {
			isLoaded: false
		};

		this._loadHandler = this._loadHandler.bind(this);
	}

	componentDidMount () {
		const { loader } = this.props;

		asyncLoader(loader, this._loadHandler);
	}

	/**
	 * Handler for `asyncLoader`.
	 * @param {object} module - Complete package as provided by module
	 * @private
	 */
	_loadHandler (_module) {
		const { component } = _module;

		if (component) {
			this._component = component;
			this.setState({ isLoaded: true });
		}
	}

	render () {
		const { children } = this.props;

		return (
			this.state.isLoaded && this._component
				? React.createElement(this._component, { ...this.props })
				: children || null
		);
	}
}

export default AsyncProvider;
