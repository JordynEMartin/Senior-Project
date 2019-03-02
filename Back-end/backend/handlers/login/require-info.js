'use strict';

module.exports = function requireInfo (req, cb) {
	let options = {};

	if (!req.body.email || !req.body.password) {
		const err = new Error('Missing info from login form');
		console.log(err, {body: req.body});
		return cb(err, null);
	}

	options.email = req.body.email;
	options.password = req.body.password;

	return cb(null, options);
};