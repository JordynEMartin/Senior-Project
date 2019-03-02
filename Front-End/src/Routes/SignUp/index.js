import React from 'react';
import serviceRequest from 'Shared/serviceRequest';
import './index.css';

class SignUp extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			password: '',
			verifyPassword: '',
			emailErr: true,
			passwordErr: true
		}

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleVerifyPasswordChange = this.handleVerifyPasswordChange.bind(this);
		this.createAccount = this.createAccount.bind(this);
	}

	handleNameChange (event) {
		this.setState({
			name: event.target.value
		});
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
  		password: event.target.value,
  		passwordErr: event.target.value !== this.state.verifyPassword && event.target.value.length > 6
  	});
  }

  handleVerifyPasswordChange (event) {
  	this.setState({
  		verifyPassword: event.target.value,
  		passwordErr: event.target.value !== this.state.password && event.target.value.length > 6
  	});
  }

  createAccount () {
  	serviceRequest({
  		method: 'POST',
  		uri: '/user/create',
  		body: {
  			email: this.state.email,
  			password: this.state.password,
  			studentName: this.state.name
  		}
  	}, function (err, resp, body) {
  		if (err) {
  			console.log(err);
  			console.log(resp.statusCode);
  			console.log(body);
  			return;
  		}

  		localStorage.setItem('userPublicId', body.userPublicId);
  	});	
  }

	render () {
		return (
			<div className="signup">

				<div className="container">

				<div className="row">

				<div className="col-sm-7 center-block">

				<form>

				<h3 className="text-center" ><img src="LogoMakr_3d3zxO.png" alt="logo" /></h3>

				<h3 className="text-center"> Sign Up </h3>

				<div className="form-group">

				<label htmlFor="Name">Name</label>

				<input className="form-control" placeholder="John Doe" onChange={this.handleNameChange} />

				</div>

				<div className="form-group">

				<label htmlFor="Email">Email address</label>

				<input className="form-control" placeholder="you@domain.com" onChange={this.handleEmailChange} />

				</div>

				<div className="form-group">

				<label htmlFor="Password">Password:</label>

				<input className="form-control" placeholder="Enter Password" onChange={this.handlePasswordChange} />

				</div>

				<div className="form-group">

				<label htmlFor="Password">Repeat Password:</label>

				<input className="form-control" placeholder="Repeat Password" onChange={this.handleVerifyPasswordChange} />

				</div>

				<button className="center-block btn btn-lg btn-primary" onClick={this.createAccount} disabled={this.state.emailErr || this.state.passwordErr} >Sign Up</button>

				</form>

				</div>

				</div>

				</div>
			</div>
		);
	}
}

export default SignUp;