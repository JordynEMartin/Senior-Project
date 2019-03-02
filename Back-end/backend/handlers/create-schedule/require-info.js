'use strict';

const uuid = require('uuid/v4');

module.exports = function requireInfo (req, cb) {
	let options = {};

	options.publicId = uuid();
	options.userPublicId = req.body.userPublicId || uuid();
	options.dorm = req.body.dorm;
	options.classes = req.body.classes;

	return cb(null, options);
};