const fs = require('fs');

function warn(message, log, file) {
	const content = `[ WARN ]: ${message} [${new Date().toISOString()}]`;
	if (log) console.warn(content);
	if (file) fs.appendFileSync('./log/log.txt', content + '\n');
	return content;
}

function error(message, log, file) {
	const content = `[ERROR]: ${message} [${new Date().toISOString()}]`;
	if (log) console.error(content);
	if (file) fs.appendFileSync('./log/log.txt', content + '\n');
	return content;
}

function info(message, log, file) {
	const content = `[ INFO ]: ${message} [${new Date().toISOString()}]`;
	if (log) console.log(content);
	if (file) fs.appendFileSync('./log/log.txt', content + '\n');
	return content;
}

module.exports = { warn, error, info };
