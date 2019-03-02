'use strict';

const requireInfo = require('./require-info');
const retrieveInfo = require('./retrieve-info');

module.exports = function (req, res) {
	console.log('hello');
	requireInfo(req, function (err, options) {
		if (err) {
			return res.status(404).send();
		}

		retrieveInfo(options.email, function (err, results) {
			if (err || !options.password || results.password !== options.password) {
				return res.status(404).send();
			}

			console.log(results);

			return res.status(200).send(results.publicId);
		});
	});
};