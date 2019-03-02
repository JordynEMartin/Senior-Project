'use strict';

const mysql = require('../../../packages/mysql');
const pino = require('pino')();

module.exports = function (userPublicId, cb) {
	const sql = `
		SELECT dorm, class1, class2, class3, class4, class5, class6
		FROM schedules
		WHERE userPublicId = ?
	`;
	
	const params = [
		userPublicId
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
		
		return cb(null, results.length > 0 && results[results.length - 1]);
	});
};