module.exports = {
	getPoints: function (dataLine) {
		const coordinates = dataLine.split(' -> ');

		// 'p'relimnary points before reordering
		const point1p = coordinates[0].split(',').map(x => parseInt(x));
		const point2p = coordinates[1].split(',').map(x => parseInt(x));

		const horLine = point1p[1] === point2p[1];
		const vertLine = point1p[0] === point2p[0];
		const diagLine = Math.abs(point1p[1] - point2p[1]) === Math.abs(point1p[0] - point2p[0]);

		return [point1p, point2p, horLine, vertLine, diagLine];
	},
};