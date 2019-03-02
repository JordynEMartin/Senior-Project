import React from 'react';
import './index.css';
import headerImg from './header-img.png';

class Header extends React.Component {
	render () {
		return (
			<div className="container-fluid">

				<div className="navbar-header">

				<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span> </button>

				<img src={headerImg} alt="logo" width="200" height="45" />

				</div>

				<div className="collapse navbar-collapse" id="myNavbar">

				<ul className="nav navbar-nav navbar-right">

				<li className="active"><a href="/home" className ="fa fa-home"></a></li>

				<li><a href="/login">Login</a></li>

				<li><a href="campusMap.html">Campus Map</a></li>

				<li><a href="/info">FAQ</a></li>

				</ul>

				</div>

			</div>
		);
	}
}

export default Header;