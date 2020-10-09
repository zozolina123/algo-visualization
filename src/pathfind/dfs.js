export default function sketch(p) {
    var _ = require('lodash');

    let canvas, columns = 20,
        rows = 20,
        array = [],
        start, end, current, stack = [],
        path = [],
        neighbours = [];
    let height = window.innerHeight - 45,
        width = 85 / 100 * window.innerWidth - 20,
        stepCounter = 0,
        nextStep = true,
        done;

    class Cell {
        constructor(i, j) {
            this.i = i;
            this.j = j;
            this.visited = false;
            this.wall = Math.random() * 100 > 95;
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
            } else if (this == current) {
                p.fill(100, 100, 100);
            } else if (this == start) {
                p.fill(0, 255, 0);
            } else if (this == end) {
                p.fill(255, 0, 0);
            } else if (done && path.includes(this)) {
                p.fill(255, 255, 0);
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
        start = array[0][0];
        start.wall = false;
        start.distance = 0;
        end = array[rows - 1][columns - 1];
        end.wall = false;
        stack.push(start);
        array.forEach(cellArray => cellArray.forEach(cell => cell.draw()));
    }

    p.draw = () => {
        if (stack.length > 0) {
            current = stack.pop();
            console.log(current);
            path.push(current);
            neighbours = current.getNeighbours();
            neighbours = neighbours.filter(node => !node.visited && !node.wall);
            current.visited = true;
            if (neighbours.length)
                neighbours.forEach(neighbour => {
                    stack.push(neighbour);
                });
            if (current == end) {
                done = true;
                p.noLoop();
            }
        }
        array.forEach(cellArray => cellArray.forEach(cell => cell.draw()));
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {}
}