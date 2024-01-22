module.exports = {solve: solve};

function solve({lines, rawData}) {

    function getNeighbors(x,y) {
        let neighbors = [];
        if (x > 0) {
            neighbors.push({x: x-1, y: y});
        }
        if (x < lines.length - 1) {
            neighbors.push({x: x+1, y: y});
        }
        if (y > 0) {
            neighbors.push({x: x, y: y-1});
        }
        if (y < lines[0].length - 1) {
            neighbors.push({x: x, y: y+1});
        }
        return neighbors;
    }

    function getKey(x,y) {
        return `${x},${y}`;
    }

    let graph = new Map();
    let goals = [];
    
    graph.set('0', {location: null, distances: new Map()});
    lines.forEach((line, x) => {
        line.match(/(\d+)/g)?.forEach(goal => {
            graph.set(goal, {location: {x: x, y: line.indexOf(goal)}, distances: new Map()});
            goals.push(goal);
        });
    });
    
    let grid = lines.map(line => line.split(''));

    graph.forEach((node, goal, index) => {
        if (index === graph.size - 1) {
            return;
        }
        
        let visited = [];
        let queue = [{location: {x: node.location.x, y: node.location.y}, distance: 0}];

        while (queue.length > 0) {
            let current = queue.shift();
            let valueAtLocation = grid[current.location.x][current.location.y];
            if (goals.includes(valueAtLocation) && valueAtLocation !== goal) {
                node.distances.set(valueAtLocation, current.distance);
                graph.get(valueAtLocation).distances.set(goal, current.distance);
            }
            
            if (node.distances.size === goals.length - 1) {
                break;
            }

            let neighbors = getNeighbors(current.location.x, current.location.y);
            neighbors.forEach(neighbor => {
                let valueAtNeighbor = grid[neighbor.x][neighbor.y];
                let neighborKey = getKey(neighbor.x, neighbor.y);
                if (valueAtNeighbor !== '#' && !visited.includes(neighborKey)) {
                    visited.push(neighborKey);
                    queue.push({location: neighbor, distance: current.distance + 1});
                }
            });
        }
    });

    let answer = Infinity;
    let queue = [{current: '0', distance: 0, visited: ['0']}];
    while (queue.length > 0) {
        let current = queue.shift();
        let node = graph.get(current.current);
        if (current.visited.length === goals.length) {
            answer = Math.min(answer, current.distance + node.distances.get('0'));
        }

        node.distances.forEach((distance, goal) => {
            if (!current.visited.includes(goal)) {
                queue.push({current: goal, distance: current.distance + distance, visited: [...current.visited, goal]});
            }
        });
    }

    return {value: answer};
}