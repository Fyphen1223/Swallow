const fs = require('fs');

function warn(message, log, file) {
	const content = `[ WRN ]: ${message} [${new Date().toISOString()}]`;
	const colored = `\u001b[31m[ WRN ]\u001b[0m: ${message} [${new Date().toISOString()}]`;
	if (log) console.warn(colored);
	if (file) fs.appendFileSync('./log/log.txt', content + '\n');
	return content;
}

function error(message, log, file) {
	const content = `[ ERR ]: ${message} [${new Date().toISOString()}]`;
	const colored = `\u001b[33m[ ERR ]\u001b[0m: ${message} [${new Date().toISOString()}]`;
	if (log) console.error(colored);
	if (file) fs.appendFileSync('./log/log.txt', content + '\n');
	return content;
}

function info(message, log, file) {
	const content = `[ INF ]: ${message} [${new Date().toISOString()}]`;
	const colored = `\u001b[34m[ INF ]\u001b[0m: ${message} [${new Date().toISOString()}]`;
	if (log) console.log(colored);
	if (file) fs.appendFileSync('./log/log.txt', content + '\n');
	return content;
}

module.exports = { warn, error, info };
