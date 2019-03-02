'use strict';

const moment = require('moment');
const uuid = require('uuid/v4');

module.exports = function requireInfo (req, cb) {
	const uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/gi;

	if (!req.body.userPublicId || !uuidv4Regex.test(req.body.userPublicId)) {
		const err = new Error('Missing info from get schedule form');
		console.log(err, {body: req.body});
		return cb(err, null);
	}

	return cb(null, req.body.userPublicId);
};