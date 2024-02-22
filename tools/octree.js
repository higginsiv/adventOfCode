class OctreeNode {
    constructor(minX, minY, minZ, maxX, maxY, maxZ) {
        this.boundingBox = { minX, minY, minZ, maxX, maxY, maxZ };
        this.children = [];
    }

    split() {
        let midX = (this.boundingBox.minX + this.boundingBox.maxX) / 2;
        let midY = (this.boundingBox.minY + this.boundingBox.maxY) / 2;
        let midZ = (this.boundingBox.minZ + this.boundingBox.maxZ) / 2;

        for (let x = 0; x < 2; x++) {
            for (let y = 0; y < 2; y++) {
                for (let z = 0; z < 2; z++) {
                    let minX = x === 0 ? this.boundingBox.minX : midX;
                    let maxX = x === 0 ? midX : this.boundingBox.maxX;
                    let minY = y === 0 ? this.boundingBox.minY : midY;
                    let maxY = y === 0 ? midY : this.boundingBox.maxY;
                    let minZ = z === 0 ? this.boundingBox.minZ : midZ;
                    let maxZ = z === 0 ? midZ : this.boundingBox.maxZ;

                    this.children.push(new OctreeNode(minX, minY, minZ, maxX, maxY, maxZ));
                }
            }
        }
    }
}

module.exports = OctreeNode;
