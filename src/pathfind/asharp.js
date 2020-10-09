export default function sketch(p) {
    var _ = require('lodash');
    let canvas, columns = 20,
        rows = 20,
        array = [],
        start, end, current, openSet, path = [],
        neighbours = [];
    let height = window.innerHeight - 45,
        width = 85 / 100 * window.innerWidth - 20,
        stepCounter = 0,
        nextStep = true;

    class Cell {
        constructor(i, j) {
            this.i = i;
            this.j = j;
            this.visited = false;
            this.distance = Infinity;
            this.score = Infinity;
            this.wall = Math.random() * 100 > 80;
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

        getDistance(targetNode) {
            return p.dist(this, end);
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
            p.square(this.i * 20, this.j * 20, 20);
        }

    }

    p.setup = () => {
        canvas = p.createCanvas(width, height);
        p.frameRate(30);
        array = _.map(new Array(rows), () => []);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                array[i][j] = new Cell(i, j);
            }
        }
        end = array[rows - 1][columns - 1];
        end.wall = false;
        start = array[0][0];
        start.wall = false;
        start.distance = 0;
        start.score = start.getDistance(end);
        openSet = [start];
    }

    p.draw = () => {
        if (openSet.length > 0) {
            current = openSet.reduce((prev, current) =>
                (prev.score <= current.score) ? prev : current); // we change current to node with lowest score
            if (current == end) {
                getPath();
            }

            current.visited = true;
            openSet = openSet.filter(node => !node.visited); // remove visited node
            neighbours = current.getNeighbours();
            neighbours = neighbours.filter(node => !node.visited && !node.wall);
            if (neighbours.length)
                neighbours.forEach(neighbour => {
                    const tempDistance = current.distance + 1;
                    if (tempDistance < neighbour.distance) {
                        neighbour.distance = tempDistance;
                        neighbour.score = tempDistance + neighbour.getDistance(end);
                        neighbour.previous = current;
                        if (!openSet.includes(neighbour))
                            openSet.push(neighbour);
                    }
                });

        }
        array.forEach(cellArray => cellArray.forEach(cell => cell.draw()));
    }

    const getPath = () => {
        while (current.previous) {
            path.push(current.previous);
            current = current.previous;
        }
        p.noLoop();
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {}
}