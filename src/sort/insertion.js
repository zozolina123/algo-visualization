export default function sketch(p) {
    var _ = require('lodash');
    let values, canvas, speed;
    let height = window.innerHeight - 45,
        width = 85 / 100 * window.innerWidth - 20,
        stepCounter = 0,
        barWidth = 20,
        i = 1,
        j = 0,
        sortedIndex = 0,
        nextStep = true;


    p.setup = () => {
        canvas = p.createCanvas(width, height);
        p.stroke('black');
        p.textSize(barWidth / 2);
        p.redraw();
        p.frameRate(speed);
        p.textAlign(p.CENTER, p.CENTER);
    }

    p.draw = () => {
        p.background('white');
        stepCounter++;
        drawArray();
        incrementIndeces();
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        if (!_.isEmpty(_.xor(values, newProps.values))) {
            values = newProps.values;
        }
        speed = newProps.speed;
        barWidth = width / values.length;
        p.frameRate(speed);
        newProps.start ? p.loop() : p.noLoop();
        if (newProps.nextStep !== nextStep) {
            p.redraw();
            nextStep = newProps.nextStep;
        }
    }

    function swap(a, b) {
        const temp = values[a];
        values[a] = values[b];
        values[b] = temp;
    }

    function drawArray() {
        if (barWidth < 50) {
            p.textSize(barWidth / 2);
        } else {
            p.textSize(barWidth / 4);
        }
        for (let k = 0; k <= values.length; k++) {
            if (k <= sortedIndex + 1) {
                p.fill(255, 140, 0);
            }
            if (k == i) {
                p.fill(0, 0, 255);
            }
            p.rect(k * barWidth, height - (values[k] / 100 * height), barWidth, height);
            p.fill(255, 255, 255);
            p.stroke(255, 255, 255);
            p.text(values[k], k * barWidth, height - (values[k] / 100 * height) + 20, barWidth);
            p.fill(20, 20, 20);
        }
        p.textSize(32);
        p.text(stepCounter, 50, 30);
    }

    function incrementIndeces() {
        if (i == values.length) {
            p.noLoop();
        }
        if (values[i] >= values[j]) {
            sortedIndex++;
            j = sortedIndex;
            i = sortedIndex + 1;
        } else if (values[i] < values[j]) {
            swap(i, j);
            if (j == 0) {
                sortedIndex++;
                j = sortedIndex;
                i = sortedIndex + 1;
            } else {
                j--;
                i--;
            }
        } else j--;
    }

}