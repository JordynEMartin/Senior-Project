'use strict';

const moment = require('moment');
const uuid = require('uuid/v4');

module.exports = function requireInfo (req, cb) {
	let options = {};

	if (!req.body.email || !req.body.password || !req.body.studentName) {
		const err = new Error('Missing info from join form');
		console.log(err, {body: req.body});
		return cb(err, null);
	}

	const creation = moment().utc().toISOString();
	const publicId = uuid();

	options.email = req.body.email;
	options.date = creation;
	options.name = req.body.studentName;
	options.username = req.body.username;
	options.publicId = publicId;
	options.password = req.body.password;

	return cb(null, options);
};