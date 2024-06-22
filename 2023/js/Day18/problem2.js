module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const [UP, DOWN, LEFT, RIGHT] = ['3', '1', '2', '0'];

    let vertices = [];
    let location = [0, 0];
    let extraDistance = 0;

    lines
        .map((line) => {
            const matches = line.match(/(\w+)/g);
            let instruction = matches[2];
            let distance = parseInt(instruction.substring(0, 5), 16);
            let direction = instruction.substring(5);

            return {
                direction: direction,
                distance: distance,
            };
        })
        .forEach((instruction) => {
            extraDistance += instruction.distance;
            switch (instruction.direction) {
                case UP:
                    location[1] += instruction.distance;
                    vertices.push([location[0], location[1]]);
                    break;
                case DOWN:
                    location[1] -= instruction.distance;
                    vertices.push([location[0], location[1]]);
                    break;
                case RIGHT:
                    location[0] += instruction.distance;
                    vertices.push([location[0], location[1]]);
                    break;
                case LEFT:
                    location[0] -= instruction.distance;
                    vertices.push([location[0], location[1]]);
                    break;
            }
        });

    // Implementation of the shoelace formula
    // TODO abstract this into the tools directory
    function calculateArea(vertices) {
        let area = 0;
        for (let i = 0; i < vertices.length; i++) {
            let j = (i + 1) % vertices.length;
            area += vertices[i][0] * vertices[j][1];
            area -= vertices[j][0] * vertices[i][1];
        }
        return Math.abs(area / 2);
    }

    // This function is aggressive because it accounts for non-right-angles in the polygon
    // TODO abstract this into the tools directory
    function calculatePerimeter(vertices) {
        let perimeter = 0;
        for (let i = 0; i < vertices.length; i++) {
            let j = (i + 1) % vertices.length;
            let dx = vertices[j][0] - vertices[i][0];
            let dy = vertices[j][1] - vertices[i][1];
            perimeter += Math.sqrt(dx * dx + dy * dy);
        }
        return perimeter;
    }

    // This is combination of Shoelace and Pick's Theorem
    const answer = calculateArea([...vertices]) + extraDistance / 2 + 1;
    return { value: answer };
}
