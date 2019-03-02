'use strict';

module.exports = function requireInfo (req, cb) {
	if (!req.body.building) {
		const err = new Error('Missing building name');
		console.log(err, {body: req.body});
		return cb(err, null);
	}

	return cb(null, req.body.building);
};
