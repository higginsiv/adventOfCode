console.time();
const { getRandomValues } = require('crypto');
const {EOL} = require('os');
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2020","20","2"];

const ON = '#';

class Tile {
    id;
    edges;
    bizarroEdges;
    orientations;
    art;
}
let edgesToTile = new Map();
let tilesToMatches = new Map();
let tileWidth;

const data = fr.getInput(year,day, EOL+EOL).forEach(x => {
    x = x.split(EOL);
    let id = x.shift().replace('Tile ', '').replace(':','');

    let north = [];
    let east = [];
    let south = [];
    let west = [];

    x.forEach((line, row, grid) => {
        line = line.split('');
        tileWidth = line.length;
        if (row === 0) {
            line.forEach(point => {
                north.push(point === ON ? 1 : 0);
            })
        } else if (row === tileWidth - 1) {
            line.forEach(point => {
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

    let tileEdges = new Set([north, east, south, west, bizarroNorth, bizarroEast, bizarroSouth, bizarroWest]);
    
    tileEdges.forEach(e => {
        if (edgesToTile.get(e) == null) {
            edgesToTile.set(e, new Set());
        }
        edgesToTile.get(e).add(id);
    })
});

edgesToTile.forEach((value, edge) => {
    value.forEach(tileKey => {
        if (value.size > 1) {
            if (tilesToMatches.get(tileKey) == null) {
                tilesToMatches.set(tileKey, []);
            }
            tilesToMatches.get(tileKey).push(edge);
        }
        
    })
})

let product = 1;
let corners = [];
tilesToMatches.forEach((matches, key) => {
    // Corners have two matching edges, but the 'bizarro' forms of these edges also match, brining the total to 4
    if (matches.length === 4) {
        corners.push(key);
        console.log(key)
        matches.forEach(match => {
            printAsBinary(match);
        })
        console.log('***')
    }
})

console.log(corners);

function flipEdge(edge) {
    let flipped = edge.toString(2).split('').reverse().join('');
    flipped = flipped.padEnd(tileWidth, '0');
    return parseInt(flipped, 2);
}

function printAsBinary(edge) {
    console.log(edge.toString(2).padStart(tileWidth, '0'));
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + product);
console.timeEnd();


// rotate 90, 180, 270
// 90 clock
// N = bizarroWest
// E = North
// S = bizarroEast
// W = South

// 180 clock
// N = bizarroSouth
// E = bizarroWest
// S = bizarrowNorth;
// W = bizarroEast;

// 270 clock (90 cc)
// N = East
// E = bizarroSouth
// S = West
// W = bizarroNorth

// flip veritical axis, horizontal axis
// vert
// N = bizarroNorth
// E = West
// S = bizarroSouth
// W = East

// hor
// N = South
// E = bizarroEast
// S = North
// W = bizarroWest

// both === 180 degree rotation
// N = bizarroSouth
// E = bizarroWest
// S = bizarroNorth
// W = bizarroEast