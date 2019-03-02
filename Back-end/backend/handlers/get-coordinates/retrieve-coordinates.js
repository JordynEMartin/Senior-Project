'use strict';

const mysql = require('../../../packages/mysql');
const pino = require('pino')();

module.exports = function (buildingName, cb) {
	const sql = `
		SELECT latitude, longitude
		FROM buildings
		WHERE name = ?
	`;
	
	const params = [
		buildingName
	];

	mysql(sql, params, function (err, results) {
		if (err) {
			pino.info('Error selecting schedule', {
				err: err,
				sql: sql,
				params: params
			});
			return cb(err);
		}

		return cb(null, results[0]);
	});
};