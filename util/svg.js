const generateSvg = (svgContent) => {
	return `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
};

module.exports = { generateSvg };
