function formatTime(seconds) {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;
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

module.exports = {
	formatTime,
};
