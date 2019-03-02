'use strict';

const mysql = require('../../../packages/mysql');
const pino = require('pino')();

module.exports = function (options, cb) {
	const sql = `
	INSERT INTO schedules (
		publicId,
		userPublicId,
		dorm,
		class1,
		class2,
		class3,
		class4,
		class5,
		class6
	) VALUES (?,?,?,?,?,?,?,?,?);
	`;
	
	let params = [
		options.publicId,
		options.userPublicId,
		options.dorm
	];

	for (let i = 0; i < 6; i++) {
		params.push(options.classes[i]);
	}

	mysql(sql, params, function (err) {
		if (err) {
			pino.info('Error inserting new schedule', {
				err: err,
				sql: sql,
				params: params
			});
			return cb(err);
		}

		return cb(null, options.publicId);
	});
};
