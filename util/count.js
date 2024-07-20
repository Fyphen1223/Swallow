const fs = require('fs');
const path = require('path');

function getIgnoredPatterns(directory) {
	try {
		const gitIgnorePath = path.join(directory, '.gitignore');
		const content = fs.readFileSync(gitIgnorePath, 'utf8');
		const res = content.split('\n').filter((line) => line.trim() !== '');
		res.push('server/');
		return res;
	} catch (error) {
		console.error(`Error reading .gitignore: ${error.message}`);
		return [];
	}
}

function isFileIgnored(filePath, ignoredPatterns) {
	return ignoredPatterns.some((pattern) => filePath.includes(pattern));
}

function countLinesAndChars(directory, ignoredPatterns = []) {
	let totalLines = 0;
	let totalChars = 0;

	const files = fs.readdirSync(directory);
	files.forEach((file) => {
		const fullPath = path.join(directory, file);
		const stat = fs.statSync(fullPath);

		if (stat.isDirectory()) {
			const subDirResults = countLinesAndChars(fullPath, ignoredPatterns);
			totalLines += subDirResults.totalLines;
			totalChars += subDirResults.totalChars;
		} else if (
			path.extname(file) === '.js' &&
			!isFileIgnored(fullPath, ignoredPatterns)
		) {
			// .jsファイルで、.gitignoreに記載されていない場合のみカウント
			const content = fs.readFileSync(fullPath, 'utf8');
			totalLines += content.split('\n').length;
			totalChars += content.length;
		}
	});

	return { totalLines, totalChars };
}

const directoryPath = '../';
const ignoredPatterns = getIgnoredPatterns(directoryPath);
const result = countLinesAndChars(directoryPath, ignoredPatterns);

console.log(`Total Lines: ${result.totalLines}`);
console.log(`Total Chars: ${result.totalChars}`);

function getLinesAndChars() {
	const directoryPath = './';
	const ignoredPatterns = getIgnoredPatterns(directoryPath);
	const result = countLinesAndChars(directoryPath, ignoredPatterns);

	return {
		totalLines: result.totalLines,
		totalChars: result.totalChars,
	};
}

module.exports = { getLinesAndChars };
