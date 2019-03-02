const request = require('request');

module.exports = function serviceRequest (options, cb) {
	request({
		method: options.method || 'GET',
		url: 'http://localhost:8080' + options.uri,
		json: options.json || true,
		body: options.body
	}, function (err, resp, body) {
		return cb(err, resp, body);
	});
};