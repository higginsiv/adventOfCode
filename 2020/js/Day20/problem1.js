console.time();
const { getRandomValues } = require('crypto');
const {EOL} = require('os');
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2020","20","1"];

const ON = '#';

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

edgesToTile.forEach((value, key) => {
    value.forEach(tileKey => {
        if (value.size > 1) {
            if (tilesToMatches.get(tileKey) == null) {
                tilesToMatches.set(tileKey, 0);
            }
            tilesToMatches.set(tileKey, tilesToMatches.get(tileKey) + 1)
        }
        
    })
})

let product = 1;
tilesToMatches.forEach((matches, key) => {
    // Corners have two matching edges, but the 'bizarro' forms of these edges also match, brining the total to 4
    if (matches === 4) {
        product *= parseInt(key)
    }
})

function flipEdge(edge) {
    let flipped = edge.toString(2).split('').reverse().join('');
    flipped = flipped.padEnd(tileWidth, '0');
    return parseInt(flipped, 2);
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + product);
console.timeEnd();