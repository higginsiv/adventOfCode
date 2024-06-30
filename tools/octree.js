const { floor } = Math;

export default class OctreeNode {
    constructor(minX, minY, minZ, maxX, maxY, maxZ) {
        this.boundingBox = { minX, minY, minZ, maxX, maxY, maxZ };
        this.children = [];
    }

    split() {
        let midX = floor((this.boundingBox.minX + this.boundingBox.maxX) / 2);
        let midY = floor((this.boundingBox.minY + this.boundingBox.maxY) / 2);
        let midZ = floor((this.boundingBox.minZ + this.boundingBox.maxZ) / 2);

        for (let x = 0; x < 2; x++) {
            let minX;
            let maxX;
            if (this.boundingBox.minX === midX) {
                minX = midX + x;
                maxX = midX + x;
            } else {
                minX = x === 0 ? this.boundingBox.minX : midX;
                maxX = x === 0 ? midX : this.boundingBox.maxX;
            }
            for (let y = 0; y < 2; y++) {
                let minY;
                let maxY;
                if (this.boundingBox.minY === midY) {
                    minY = midY + y;
                    maxY = midY + y;
                } else {
                    minY = y === 0 ? this.boundingBox.minY : midY;
                    maxY = y === 0 ? midY : this.boundingBox.maxY;
                }
                for (let z = 0; z < 2; z++) {
                    let minZ;
                    let maxZ;
                    if (this.boundingBox.minZ === midZ) {
                        minZ = midZ + z;
                        maxZ = midZ + z;
                    } else {
                        minZ = z === 0 ? this.boundingBox.minZ : midZ;
                        maxZ = z === 0 ? midZ : this.boundingBox.maxZ;
                    }

                    this.children.push(new OctreeNode(minX, minY, minZ, maxX, maxY, maxZ));
                }
            }
        }
    }
}
