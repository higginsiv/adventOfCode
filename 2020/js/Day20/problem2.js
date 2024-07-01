import { EOL } from 'os';
export default function solve({ lines, rawData }) {
    const ON = '#';

    class Tile {
        id;
        north;
        east;
        south;
        west;
        edges;
        art;
        constructor(id, edges, art) {
            this.id = id;
            this.north = edges[0];
            this.east = edges[1];
            this.south = edges[2];
            this.west = edges[3];
            this.art = art;
        }
    }
    let edgesToTileId = new Map();
    let tileIdToEdgesWithMatches = new Map();
    let tileIdToTile = new Map();
    let tileWidth;

    rawData.split(EOL + EOL).forEach((x) => {
        x = x.split(EOL);
        let id = x.shift().replace('Tile ', '').replace(':', '');

        let north = [];
        let east = [];
        let south = [];
        let west = [];
        let art = [];

        x.forEach((line, row, grid) => {
            line = line.split('');
            tileWidth = line.length;
            if (row === 0) {
                line.forEach((point) => {
                    north.push(point === ON ? 1 : 0);
                });
            } else if (row === tileWidth - 1) {
                line.forEach((point) => {
                    south.push(point === ON ? 1 : 0);
                });
            } else {
                art[row - 1] = line.slice(1, line.length - 1);
            }
            west.push(line[0] === ON ? 1 : 0);
            east.push(line[line.length - 1] === ON ? 1 : 0);
        });

        north = parseInt(north.join(''), 2);
        east = parseInt(east.join(''), 2);
        south = parseInt(south.join(''), 2);
        west = parseInt(west.join(''), 2);

        let bizarroNorth = flipEdge(north);
        let bizarroEast = flipEdge(east);
        let bizarroSouth = flipEdge(south);
        let bizarroWest = flipEdge(west);

        let tileEdges = new Set([
            north,
            east,
            south,
            west,
            bizarroNorth,
            bizarroEast,
            bizarroSouth,
            bizarroWest,
        ]);

        tileEdges.forEach((e) => {
            if (edgesToTileId.get(e) == null) {
                edgesToTileId.set(e, new Set());
            }
            edgesToTileId.get(e).add(id);
        });

        tileIdToTile.set(id, new Tile(id, [north, east, south, west], art));
    });

    let gridWidth = Math.sqrt(tileIdToTile.size);

    edgesToTileId.forEach((value, edge) => {
        value.forEach((tileKey) => {
            if (value.size > 1) {
                if (tileIdToEdgesWithMatches.get(tileKey) == null) {
                    tileIdToEdgesWithMatches.set(tileKey, []);
                }
                tileIdToEdgesWithMatches.get(tileKey).push(edge);
            }
        });
    });

    let corners = [];
    tileIdToEdgesWithMatches.forEach((matches, key) => {
        // Corners have two matching edges, but the 'bizarro' forms of these edges also match, brining the total to 4
        if (matches.length === 4) {
            corners.push(tileIdToTile.get(key));
        }
    });

    let quilt = Array.from(Array(gridWidth), () => new Array(gridWidth));
    let spentTiles = new Set();

    // Rotate first corner so that matching sides are East and South
    let firstCorner = corners[0];
    let rotations = 0;
    while (true) {
        if (rotations > 3) {
            console.log('paniccc');
        }
        let eastMatches = edgesToTileId.get(firstCorner.east);
        let southMatches = edgesToTileId.get(firstCorner.south);

        if (eastMatches.size === 2 && southMatches.size === 2) {
            break;
        } else {
            firstCorner = rotateTileClockwise(firstCorner);
            rotations++;
        }
    }

    quilt[0][0] = firstCorner;
    spentTiles.add(corners[0].id);

    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridWidth; j++) {
            if (quilt[i][j] != null) {
                continue;
            }

            let tileToPlace;

            // If furthest left, look up instead
            if (j === 0) {
                // Match to the Southern Edge of the Northern Tile
                let edgeToMatch = quilt[i - 1][j].south;
                tileToPlace = findAndOrientTileToPlace(edgeToMatch, northMatchesSouthernEdge);
            } else {
                // Match to the Eastern Edge of the Western Tile
                let edgeToMatch = quilt[i][j - 1].east;
                tileToPlace = findAndOrientTileToPlace(edgeToMatch, westMatchesEasterEdge);
            }

            quilt[i][j] = tileToPlace;
            spentTiles.add(tileToPlace.Id);
        }
    }

    // Combine Quilt into singular 2D Array
    let bigArt = [];
    let offset = 0;
    quilt.forEach((row) => {
        row.forEach((tile) => {
            tile.art.forEach((artLine, index) => {
                if (bigArt[index + offset] == null) {
                    bigArt[index + offset] = [];
                }
                bigArt[index + offset] = bigArt[index + offset].concat(artLine);
            });
        });
        offset += tileWidth - 2;
    });

    // Search Quilt for Sea Monsters. If none are found, transform the art until at least one is found
    let monsterTotal = 0;
    rotations = 0;
    while (monsterTotal === 0) {
        monsterTotal = findSeaMonsters(bigArt);
        if (monsterTotal === 0) {
            if (rotations < 3) {
                bigArt = rotateArtClockwise(bigArt);
                rotations++;
            } else {
                bigArt = flipArt(bigArt);
                rotations = 0;
            }
        }
    }

    // Calculate tiles that the monster occupies
    let monsterPoints = monsterTotal * 15;
    let totalWaterPoints = bigArt.reduce((total, line) => {
        return (
            total +
            line.reduce((lineTotal, point) => {
                return point === ON ? lineTotal + 1 : lineTotal;
            }, 0)
        );
    }, 0);
    let answer = totalWaterPoints - monsterPoints;

    function findAndOrientTileToPlace(edgeToMatch, comparison) {
        // Get all tiles that have a matching edge
        let tilesWithEdge = Array.from(edgesToTileId.get(edgeToMatch));
        let tile;

        for (let k = 0; k < tilesWithEdge.length; k++) {
            tile = tileIdToTile.get(tilesWithEdge[k]);
            if (!spentTiles.has(tile.id)) {
                spentTiles.add(tile.id);
                break;
            }
        }

        // Orient the tile so that the matching edge is on the West of the Tile
        let rotations = 0;
        let flipped = false;
        while (!comparison(tile, edgeToMatch)) {
            if (rotations < 3) {
                tile = rotateTileClockwise(tile);
                rotations++;
            } else if (rotations === 3) {
                tile = flipTile(tile);
                flipped = true;
                rotations = 0;
            }
        }

        return tile;
    }

    function northMatchesSouthernEdge(tile, edgeToMatch) {
        return tile.north === edgeToMatch;
    }

    function westMatchesEasterEdge(tile, edgeToMatch) {
        return tile.west === edgeToMatch;
    }

    function rotateTileClockwise(tile) {
        let tempNorth = flipEdge(tile.west);
        let tempEast = tile.north;
        let tempSouth = flipEdge(tile.east);
        let tempWest = tile.south;

        tile.north = tempNorth;
        tile.east = tempEast;
        tile.south = tempSouth;
        tile.west = tempWest;
        tile.art = rotateArtClockwise(tile.art);

        return tile;
    }

    function rotateArtClockwise(art) {
        let tempArt = [];
        let rows = art.length;

        for (let i = 0; i < rows; i++) {
            tempArt[i] = Array(rows);
        }

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < rows; j++) {
                tempArt[i][j] = art[rows - j - 1][i];
            }
        }

        return tempArt;
    }

    // Flips along the vertical axis
    function flipTile(tile) {
        let tempNorth = flipEdge(tile.north);
        let tempEast = tile.west;
        let tempSouth = flipEdge(tile.south);
        let tempWest = tile.east;

        tile.north = tempNorth;
        tile.east = tempEast;
        tile.south = tempSouth;
        tile.west = tempWest;
        tile.art = flipArt(tile.art);

        return tile;
    }

    // Flips along the vertical axis
    function flipArt(art) {
        let tempArt = [];
        let rows = art.length;

        for (let i = 0; i < rows; i++) {
            tempArt[i] = art[i].slice().reverse();
        }

        return tempArt;
    }

    // Mirrors a binary string
    function flipEdge(edge) {
        let flipped = edge.toString(2).split('').reverse().join('');
        flipped = flipped.padEnd(tileWidth, '0');
        return parseInt(flipped, 2);
    }

    function findSeaMonsters(art) {
        let monsterTotal = 0;
        for (let row = 0; row < art.length; row++) {
            for (let col = 0; col < art.length; col++) {
                let points = [
                    [row, col],
                    [row, col + 5],
                    [row, col + 6],
                    [row, col + 11],
                    [row, col + 12],
                    [row, col + 17],
                    [row, col + 18],
                    [row, col + 19],
                    [row + 1, col + 1],
                    [row + 1, col + 4],
                    [row + 1, col + 7],
                    [row + 1, col + 10],
                    [row + 1, col + 13],
                    [row + 1, col + 16],
                    [row - 1, col + 18],
                ];

                let foundMonster = true;
                for (let i = 0; i < points.length; i++) {
                    let [testRow, testCol] = points[i];
                    if (art[testRow] == null) {
                        foundMonster = false;
                        break;
                    } else if (art[testRow][testCol] !== ON) {
                        foundMonster = false;
                    }
                }

                if (foundMonster) {
                    monsterTotal++;
                }
            }
        }
        return monsterTotal;
    }

    function printAsBinary(edge) {
        console.log(edge.toString(2).padStart(tileWidth, '0'));
    }

    function printBigArt(art) {
        art.forEach((line, i) => {
            let p = '';
            line.forEach((point) => {
                p += point;
            });
        });
    }
    return { value: answer };
}
