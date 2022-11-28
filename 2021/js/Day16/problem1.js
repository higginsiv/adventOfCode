const fr = require('../../../tools/fileReader');
let data = fr.getInput("2021",16, '', 'input.txt').map(x => parseInt(x, 16).toString(2).padStart(4, '0'));

data = data.join('');

class Packet {
	constructor(version, type) {
		this.version = version;
		this.type = type;
		this.literal = null;
		this.length = null;
		this.subPacketBits = null;
		this.subPacketNum = null;
		this.subPackets = [];
	}
}

let totalPacketVersion = 0;
processPacket(data);

function processPacket(packetData, maxSiblingPackets) {
	let siblingPackets = [];

	while (((packetData.length > 0 && !maxSiblingPackets) || (maxSiblingPackets && siblingPackets.length < maxSiblingPackets))) {
		let packet = new Packet();
		siblingPackets.push(packet);
		packet.version = parseInt(packetData.substring(0, 3), 2);
		totalPacketVersion += packet.version;
		packet.type = parseInt(packetData.substring(3, 6), 2);
		let detail = packetData.substring(6);

		if (packet.type === 4) {
			let done = false;
			let literal = '';
			let digits = 0;
			while (!done) {
				let sub = detail.substring(0, 5);
				const firstBit = sub.substring(0, 1);
				literal += sub.substring(1, 5);
				digits++;
				detail = detail.substring(5);

				if (firstBit === '0') {
					done = true;
				}
			}
			packet.literal = parseInt(literal, 2);
			packetData = detail;
		} else {
			packet.length = detail.substring(0, 1);
			detail = detail.substring(1);

			if (packet.length === '0') {
				packet.subPacketBits = parseInt(detail.substring(0, 15), 2);

				packet.subPackets = processPacket(detail.substring(15, 15 + packet.subPacketBits));
				packetData = detail.substring(15 + packet.subPacketBits);
			} else if (packet.length === '1') {
				packet.subPacketNum = parseInt(detail.substring(0, 11), 2)

				if (packet.subPacketNum === '0') {
					packetData = detail.substring(11);
					break;
				}
				packet.subPackets = processPacket(detail.substring(11), packet.subPacketNum);

				if (packet.subPacketNum > 0 && packet.subPackets[packet.subPackets.length - 1].rollover) {
					packetData = packet.subPackets.pop().rollover;
				} else if (packet.subPacketNum !== 0){
					packetData = '';
				}
			}
		}
		if (packetData.length < 6) {
			// dirty way to assume that I'm at the extra 0s at the end.
			// no packet can have less than the 6 header bits
			packetData = '';
		}
	}
	if (packetData.length > 0) {
		siblingPackets.push({'rollover': packetData});
	}
	return siblingPackets;
}

console.log('Day 16 Puzzle 1: ' + totalPacketVersion);