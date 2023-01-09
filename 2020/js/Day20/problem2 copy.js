console.time();
const { getRandomValues } = require('crypto');
const {EOL} = require('os');
const { exit } = require('process');
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2020","20","1"];

const DELIM = '|';
const [ON, OFF] = ['#', '.'];

function printAsBinary(edge) {
    console.log(edge.toString(2).padStart(10, '0'));
}
class Tile {
    id;
    orientations;
    constructor(id, orientations) {
        this.id = id;
        this.orientations = orientations;
    }
}

class Quilt {

}

class Orientation {
    id;
    north;
    east;
    south;
    west;
    constructor(north, east, south, west) {
        this.north = north;
        this.east = east;
        this.south = south;
        this.west = west;
        this.id = generateOrientationId(north, east, south, west);
    }
}

let idsToTiles = new Map();
let edgesToTile = new Map();
let edgesToOrientation = new Map();
let tilesToMatches = new Map();
let edges = [];
let edgePairs = [];
let tileWidth;
let tileLength;

const data = fr.getInput(year,day, EOL+EOL).map(x => {
    x = x.split(EOL);
    let id = x.shift().replace('Tile ', '').replace(':','');
    console.log(id);
    let north = [];
    let east = [];
    let south = [];
    let west = [];

    x.forEach((line, row, grid) => {
        tileLength = grid.length;
        line = line.split('');
        tileWidth = line.length;
        if (row === 0) {
            line.forEach((point, col) => {
                north.push(point === ON ? 1 : 0);
            })
        } else if (row === grid.length - 1) {
            line.forEach((point, col) => {
                south.push(point === ON ? 1 : 0);
            })
        } 
        west.push(line[0] === ON ? 1 : 0)
        east.push(line[line.length - 1] === ON ? 1 : 0)
    });

    north = parseInt(north.join(''), 2);
    east = parseInt(east.join(''), 2);
    south = parseInt(south.join(''), 2);
    west = parseInt(west.join(''), 2);

    let bizarroNorth = flipEdge(north);
    let bizarroEast = flipEdge(east);
    let bizarroSouth = flipEdge(south);
    let bizarroWest = flipEdge(west);

 
    if (id === '2311') {
        console.log('start list')
        printAsBinary(north);
        printAsBinary(east);
        printAsBinary(south);
        printAsBinary(west);
        console.log('***');
        printAsBinary(bizarroNorth);
        printAsBinary(bizarroEast);
        printAsBinary(bizarroSouth);
        printAsBinary(bizarroWest);
        console.log('end list')
    }

    let tileEdges = new Set([north, east, south, west, bizarroNorth, bizarroEast, bizarroSouth, bizarroWest]);
    
    tileEdges.forEach(e => {
        if (id === '2311') {
            // printAsBinary(e);
        }
        if (edgesToTile.get(e) == null) {
            edgesToTile.set(e, new Set());
        }
        edgesToTile.get(e).add(id);
    })
    edges.push(north, east, south, west);
    edges.push(flipEdge(north), flipEdge(east), flipEdge(south), flipEdge(west));
    let orientation = new Orientation(north, east, south, west);
    idsToTiles.set(id, new Tile(id, [orientation]));
});

let gridSize = Math.sqrt(idsToTiles.size);

console.log(gridSize)
console.log(tileLength);
console.log(tileWidth);

edges.sort((a, b) => a - b);

edges.forEach(x => {
    console.log(x);
})


edgesToTile.forEach((value, key) => {
    value.forEach(tileKey => {
        if (value.size > 1) {
            if (tilesToMatches.get(tileKey) == null) {
                tilesToMatches.set(tileKey, 0);
            }
            tilesToMatches.set(tileKey, tilesToMatches.get(tileKey) + 1)
        }
        
    })
    console.log(key.toString(2).padStart(tileLength, '0'))
    console.log(value)
    console.log('***')
})

let product = 1;
tilesToMatches.forEach((matches, key) => {
    if (matches === 4) {
        product *= parseInt(key)
    }
    console.log(matches + ': ' + key)
    // console.log(idsToTiles.get(key))
})
// console.log(edges);

let quilt;
// idsToTiles.forEach((tile, id, map) => {
//     console.log(tile.orientations[0])
// })

function verticalAxisMirror(orientation) {
    let newNorth = parseInt(orientation.north.toString(2).split('').reverse().join(''), 2);
    let newEast = orientation.west;
    let newSouth = parseInt(orientation.south.toString(2).split('').reverse().join(''), 2);
    let newWest = orientation.east;

    return new Orientation(newNorth, newEast, newSouth, newWest);
}

function flipEdge(edge) {
    let flipped = edge.toString(2).split('').reverse().join('');
    flipped = flipped.padEnd(tileWidth, '0');
    return parseInt(flipped, 2);
}

function horizontalAxisMirror(orientation) {
    let newNorth = orientation.south;
    let newEast = parseInt(orientation.east.toString(2).split('').reverse().join(''), 2);
    let newSouth = orientation.north;
    let newWest = parseInt(orientation.west.toString(2).split('').reverse().join(''), 2);

    return new Orientation(newNorth, newEast, newSouth, newWest);
}

function doubleReflection(orientation) {
    return horizontalAxisMirror(verticalAxisMirror(orientation));
}

function generateOrientationId(north, south, east, west) {
    return north + DELIM + south + DELIM + east + DELIM + west;
}

//TODO what reflections equal what rotations?
let answer;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + product);
console.timeEnd();


// NW, NE, SW, SE, BNW, BNE, BSW, BSE