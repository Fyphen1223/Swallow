function formatTime(seconds) {
	if (seconds == 0) return '0s';
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	let formattedTime = '';
	if (hours > 0) {
		formattedTime += `${hours}h`;
	}
	if (minutes > 0) {
		formattedTime += `${minutes}m`;
	}
	if (remainingSeconds > 0) {
		formattedTime += `${remainingSeconds}s`;
	}
	return formattedTime;
}

function parseTimeToSeconds(timeString) {
	let timePattern = /^(\d+h)?(\d+m)?(\d+s)?$/; // 正しいパターン: [数値]h[数値]m[数値]s
	if (!timePattern.test(timeString)) {
		return false; // フォーマットに合っていない場合はfalseを返す
	}

	let hours = timeString.match(/\d+(?=h)/);
	let minutes = timeString.match(/\d+(?=m)/);
	let seconds = timeString.match(/\d+(?=s)/);

	hours = hours ? parseInt(hours[0]) : 0;
	minutes = minutes ? parseInt(minutes[0]) : 0;
	seconds = seconds ? parseInt(seconds[0]) : 0;

	return hours * 3600 + minutes * 60 + seconds;
}

function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
	formatTime,
	parseTimeToSeconds,
	wait,
};
