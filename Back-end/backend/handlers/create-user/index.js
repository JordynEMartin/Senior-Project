'use strict';

const requireInfo = require('./require-info');
const insertUser = require('./insert-user');

module.exports = function (req, res) {
	requireInfo(req, function (err, options) {
		if (err) {
			return res.status(500).send(['Error verifying info', {err: err, info: req.body}]);
		}

		insertUser(options, function (err, publicId) {
			if (err) {
				return res.status(500).send(['Error creating user', {err: err, options: options}]);
			}
			res.status(200).send({userPublicId: publicId});
		});
	});
};