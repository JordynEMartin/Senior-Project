import React, { Component } from 'react';
import serviceRequest from 'Shared/serviceRequest';
import Header from 'Components/Header';
import MapComponent from 'Components/Map';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			className1: '',
			className2: '',
			className3: '',
			className4: '',
			className5: '',
			className6: '',
			userPublicId: '9c65d0fe-9bee-4244-a8bd-48c9ac296470',
			dorm: '',
			activated: ''
		}

		this.handleclassName1Change = this.handleclassName1Change.bind(this);
		this.handleclassName2Change = this.handleclassName2Change.bind(this);
		this.handleclassName3Change = this.handleclassName3Change.bind(this);
		this.handleclassName4Change = this.handleclassName4Change.bind(this);
		this.handleclassName5Change = this.handleclassName5Change.bind(this);
		this.handleclassName6Change = this.handleclassName6Change.bind(this);
		this.submitSchedule = this.submitSchedule.bind(this);
		this.findSchedule = this.findSchedule.bind(this);
		this.changeActivated = this.changeActivated.bind(this);
	}

	componentDidMount () {
		this.findSchedule();
	}

	handleclassName1Change (event) {
		this.setState({
			className1: event.target.value
		});
	}

	handleclassName2Change (event) {
		this.setState({
			className2: event.target.value
		});
	}

	handleclassName3Change (event) {
		this.setState({
			className3: event.target.value
		});
	}
	
	handleclassName4Change (event) {
		this.setState({
			className4: event.target.value
		});
	}

	handleclassName5Change (event) {
		this.setState({
			className5: event.target.value
		});
	}

	handleclassName6Change (event) {
		this.setState({
			className6: event.target.value
		});
	}

	changeActivated (event, classNum) {
		this.setState({
			activated: classNum
		});
	}

	submitSchedule () {
		serviceRequest({
			method: 'POST',
			uri: '/schedule/create',
			body: {
				userPublicId: this.state.userPublicId,
				dorm: this.state.dorm,
				classes: [this.state.className1, this.state.className2, this.state.className3, this.state.className4, this.state.className5, this.state.className6]
			}
		}, function (err, resp, body) {
			if (err || resp.statusCode >= 400) {
				console.log(err);
				console.log(resp.statusCode);
				return;
			}

			if (!localStorage.getItem('userPublicId')) {
				localStorage.setItem('userPublicId': body.publicId);
			}
		});
	}

	findSchedule () {
		console.log('hi');
		serviceRequest({
			method: 'PUT',
			uri: '/schedule',
			body: {
				userPublicId: this.state.userPublicId
			}
		}, (err, resp, body) => {
			if (err) {
				console.log(err);
				return;
			}
			if (resp.statusCode >= 400) {
				return;
			}
			this.setState({
				class1: body.class1 || '',
				class2: body.class2 || '',
				class3: body.class3 || '',
				class4: body.class4 || '',
				class5: body.class5 || '',
				class6: body.class6 || '',
				dorm: body.dorm || '',
				activated: body.class1 || body.class2 || body.class3 || body.class4 || body.class5 || body.class6
			});
		});
	}

	render () {
		return (
			<div className="container">

				<Header />

				<div className="row">

					<div className="col-sm-7 center-block">

					<form>

					<h3 className ="text-center"> Enter classroom </h3>

					<div className="form-group">

						<label>Class One:</label>

						<input className="form-control" onChange={this.handleclassName1Change} placeholder="Example: Langner 123" />

					</div>

				<div className="form-group">

					<label>Class Two:</label>

					<input className="form-control" onChange={this.handleclassName2Change} placeholder="Example: Langner 123" />

				</div>

				<div className="form-group">

					<label>Class Three:</label>

					<input className="form-control" onChange={this.handleclassName3Change} placeholder="Example: Langner 123" />

				</div>

				<div className="form-group">

					<label>Class Four:</label>

					<input className="form-control" onChange={this.handleclassName4Change} placeholder="Example: Langner 123" />

				</div>

				<div className="form-group">

					<label>Class Five:</label>

					<input className="form-control" onChange={this.handleclassName5Change} placeholder="Example: Langner 123" />

				</div>

				<div className="form-group">

					<label>Class Six:</label>

					<input className="form-control" onChange={this.handleclassName6Change} placeholder="Example: Langner 123" />

				</div>

				<div className="sign">

					<label>Want to Sign up?</label>

				<label><a href="/signup" style={{color: 'dodgerblue'}}>Sign up</a></label>

				</div>

					<button onClick={this.submitSchedule} className="center-block btn btn-lg btn-primary">Submit</button>

				</form>

				</div>

				</div>

				<MapComponent 
					building={this.state.activated && this.state.activated.split(' ')[0]}
				/>

				{
					this.state.class1 ?
					<div className="select-class" style={{width:'100%'}} onClick={(e) => {this.changeActivated(e, this.state.class1)}}>
						<h1>{this.state.class1}</h1>
					</div>
					: null
				}
				{
					this.state.class2 ?
					<div className="select-class" style={{width:'100%'}} onClick={(e) => {this.changeActivated(e, this.state.class2)}}>
						<h1>{this.state.class2}</h1>
					</div>
					: null
				}
				{
					this.state.class3 ?
					<div className="select-class" style={{width:'100%'}} onClick={(e) => {this.changeActivated(e, this.state.class3)}}>
						<h1>{this.state.class3}</h1>
					</div>
					: null
				}
				{
					this.state.class4 ?
					<div className="select-class" style={{width:'100%'}} onClick={(e) => {this.changeActivated(e, this.state.class4)}}>
						<h1>{this.state.class4}</h1>
					</div>
					: null
				}
				{
					this.state.class5 ?
					<div className="select-class" style={{width:'100%'}} onClick={(e) => {this.changeActivated(e, this.state.class5)}}>
						<h1>{this.state.class5}</h1>
					</div>
					: null
				}
				{
					this.state.class6 ?
					<div className="select-class" style={{width:'100%'}} onClick={(e) => {this.changeActivated(e, this.state.class6)}}>
						<h1>{this.state.class6}</h1>
					</div>
					: null
				}

				</div>
		);
	}
}

export default Home;
