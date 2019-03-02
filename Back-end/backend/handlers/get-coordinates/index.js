'use strict';

const requireInfo = require('./require-info');
const retrieveCoordinates = require('./retrieve-coordinates');

module.exports = function (req, res) {
	requireInfo(req, function (err, buildingName) {
		if (err) {
			return res.status(404).send();
		}

		retrieveCoordinates(buildingName, function (err, coordinates) {
			if (err || !coordinates) {
				return res.status(404).send();
			}

			return res.status(200).send(coordinates);
		});
	});
};