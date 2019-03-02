'use strict';

const requireInfo = require('./require-info');
const selectSchedule = require('./select-schedule');

module.exports = function (req, res) {
	requireInfo(req, function (err, userPublicId) {
		if (err) {
			return res.status(500).send(['Error verifying info', {err: err, info: req.body}]);
		}

		selectSchedule(userPublicId, function (err, results) {
			if (err) {
				return res.status(500).send(['Error selecting schedule'], {err: err, info: userPublicId});
			}

			if (!results) {
				return res.status(404).send();
			}

			res.status(200).send(results);
		});
	});
};