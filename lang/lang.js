const en = require('./en.json');
const ja = require('./ja.json');

function getLocale(locale) {
	switch (locale) {
		case 'ja':
			return ja;
		default:
			return en;
	}
}

module.exports = { getLocale };
