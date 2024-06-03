const fs = require('fs');

function prune() {
	const folderPath = './log';
	fs.readdir(folderPath, (err, files) => {
		if (err) {
			console.error('Error reading directory:', err);
			return;
		}
		files.forEach((file) => {
			if (file !== 'log.txt') {
				fs.unlink(`${folderPath}/${file}`, (err) => {
					if (err) {
						console.error('Error deleting file:', err);
					} else {
						console.log(`Deleted log file: ${file}`);
					}
				});
			}
		});
	});
}

module.exports = { prune };
