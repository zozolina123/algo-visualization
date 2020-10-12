export default function sketch(p) {
    var _ = require('lodash');

    let canvas, columns,
        rows,
        array = [],
        walls,
        start, end, current, unvisited, path = [],
        neighbours = [];
    let height = window.innerHeight - 45,
        width = 85 / 100 * window.innerWidth - 20,
        cellWidth = width / rows,
        cellHeight = height / columns,
        stepCounter = 0,
        nextStep = true;

    class Cell {
        constructor(i, j) {
            this.i = i;
            this.j = j;
            this.visited = false;
            this.distance = Infinity;
            this.wall = Math.random() * 100 > 65;
            this.size = cellWidth > cellHeight ? cellHeight : cellWidth;
        }

        getNeighbours = () => {
            const neighbours = [];
            if (this.i > 0) {
                neighbours.push(array[this.i - 1][this.j])
            }
            if (this.j > 0) {
                neighbours.push(array[this.i][this.j - 1])
            }
            if (this.i < array.length - 1) {
                neighbours.push(array[this.i + 1][this.j])
            }
            if (this.j < array.length - 1) {
                neighbours.push(array[this.i][this.j + 1])
            }
            return neighbours;
        }

        draw = () => {
            p.fill(255);
            if (this.wall) {
                p.fill(0);
            } else if (this == start) {
                p.fill(0, 255, 0);
            } else if (this == end) {
                p.fill(255, 0, 0);
            } else if (path.includes(this)) {
                p.fill(255, 255, 0);
            } else if (neighbours.includes(this)) {
                p.fill(255, 100, 50);
            } else if (this.visited) {
                p.fill(255, 0, 255);
            }
            p.square(this.i * this.size, this.j * this.size, this.size);
        }

    }

    p.setup = () => {
        p.frameRate(30);
    }

    p.draw = () => {
        if (unvisited.length > 0) {
            neighbours = current.getNeighbours();
            neighbours = neighbours.filter(node => !node.visited && !node.wall);
            if (neighbours.length)
                neighbours.forEach(neighbour => {
                    const tempDistance = current.distance + 1;
                    if (tempDistance < neighbour.distance) {
                        neighbour.distance = tempDistance;
                        neighbour.previous = current;
                    }
                });
            current.visited = true;
            unvisited = unvisited.filter(node => !node.visited); // remove visited node
            if (current == end) {
                while (current.previous) {
                    path.push(current.previous);
                    current = current.previous;
                }
                p.noLoop();
            } else if (unvisited.length) {
                current = unvisited.reduce((prev, current) =>
                    (prev.distance <= current.distance) ? prev : current); // we change current to node with lowest distance
            }
        }
        array.forEach(cellArray => cellArray.forEach(cell => cell.draw()));
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        columns = newProps.columns;
        rows = newProps.rows;
        walls = newProps.walls;
        array = _.map(new Array(rows), () => []);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                array[i][j] = new Cell(i, j);
                array[i][j].wall = walls[i][j];
            }
        }
        canvas = p.createCanvas(array[0][0].size * rows, array[0][0].size * columns);
        start = array[0][0];
        start.wall = false;
        start.distance = 0;
        current = start;
        end = array[rows - 1][columns - 1];
        end.wall = false;
        unvisited = array.slice().flat();
        cellWidth = width / rows;
        cellHeight = height / columns;
        array.forEach(cellArray => cellArray.forEach(cell => cell.draw()));
    }
}