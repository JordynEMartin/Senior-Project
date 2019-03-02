import React from 'react';
import serviceRequest from 'Shared/serviceRequest';

class Login extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			emailErr: true
		}

		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.sendLogin = this.sendLogin.bind(this);
	}

	handleEmailChange (event) {
    const newEmail = event.target.value;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi;
    const validEmail = emailRegex.test(newEmail);
    this.setState({
      email: newEmail,
      emailErr: !validEmail
    });
  }

  handlePasswordChange (event) {
  	this.setState({
  		password: event.target.value
  	});
  }

  sendLogin () {
  	serviceRequest({
  		method: 'PUT',
  		uri: '/user/login',
  		body: {
  			email: this.state.email,
  			password: this.state.password
  		}
  	}, function (err, resp, body) {
  		if (err) {
  			console.log(err);
  			console.log(body);
  			return;
  		}
  		localStorage.setItem('userPublicId', body.publicId);
  	});
  }

	render () {
		return (
			<div className="container">

				<div className="row">

				<div className="col-sm-7 center-block">

				<form>

				<h3 className="text-center" ><img src="LogoMakr_3d3zxO.png" alt="logo" /></h3>

				<h3 className ="text-center"> Log-In </h3>

				<div className="form-group">

				<label htmlFor="Email">Email address</label>

				<input className="form-control" placeholder="you@domain.com" onChange={this.handleEmailChange} />

				</div>

				<div className="form-group">

				<label htmlFor="Password">Password:</label>

				<input className="form-control" placeholder="Enter Password" onChange={this.handlePasswordChange} />

				</div>

				<div className="sign">

					<label htmlFor="Signup">Want to Sign up?</label>

				<label><a href="signup" style={{color: 'dodgerblue'}}>Sign up</a></label>

				</div>

				<button className="center-block btn btn-lg btn-primary" onClick={this.sendLogin} disabled={this.state.emailErr} >Log-in</button>

				</form>

				</div>

				</div>

			</div>
		);
	}
}

export default Login;