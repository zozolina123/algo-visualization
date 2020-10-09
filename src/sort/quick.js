export default function sketch(p) {
    var _ = require('lodash');
    let values = [],
        canvas, speed, start;
    let height = window.innerHeight - 45,
        width = 85 / 100 * window.innerWidth - 20,
        stepCounter = 0,
        barWidth = 20,
        delay = 10000 / speed,
        nextStep = true,
        shouldContinue = true,
        i, lowTracker, highTracker;

    p.setup = () => {
        canvas = p.createCanvas(width, height);
        p.stroke('black');
        p.textSize(barWidth / 2);
        p.frameRate(speed);
        p.textAlign(p.CENTER, p.CENTER);
        p.noLoop();
    }

    p.draw = () => {
        p.noLoop();
        p.background('white');
        stepCounter++;
        drawArray(values);
        if (!start)
            shouldContinue = false;
        else {
            shouldContinue = true;
        }
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        if (!_.isEmpty(_.xor(values, newProps.values))) {
            values = newProps.values;
            quicksort(values, 0, values.length - 1);
        }
        speed = newProps.speed;
        delay = 1000 / speed;
        barWidth = width / values.length;
        p.frameRate(speed);
        start = newProps.start;
        if (newProps.nextStep !== nextStep || start) {
            p.redraw();
            nextStep = newProps.nextStep;
            shouldContinue = true;
        }
    }

    function swap(a, b) {
        const temp = values[a];
        values[a] = values[b];
        values[b] = temp;
    }

    function drawArray() {
        for (let k = 0; k < values.length; k++) {
            if (k >= lowTracker - 1 && k <= highTracker) {
                p.fill(255, 140, 100);
            }
            if (k == highTracker) {
                p.fill(255, 0, 0);
            }
            if (k == i) {
                p.fill(0, 0, 255);
            }
            p.rect(k * barWidth, height - (values[k] / 100 * height), barWidth, height);
            p.stroke(255, 255, 255);
            p.fill(255, 255, 255);
            if (barWidth < 50) {
                p.textSize(barWidth / 2);
            } else {
                p.textSize(barWidth / 4);
            }
            p.text(values[k], k * barWidth, height - (values[k] / 100 * height) + 20, barWidth);
            p.fill(20, 20, 20);
        }
        p.textSize(32);
        p.text(stepCounter, 50, 30);
    }

    async function quicksort(array, low, high) {
        lowTracker = low;
        highTracker = high;
        if (low < high) {
            const pi = await partition(array, low, high);
            await quicksort(array, low, pi - 1);
            await quicksort(array, pi + 1, high);
        } else {
            await new Promise(r => setTimeout(r, delay));
            while (!shouldContinue) {
                await new Promise(r => setTimeout(r, delay));
            }
            p.redraw();
        }
        if (isSorted(array)) {
            i = -1;
            lowTracker = -1;
            highTracker = -1;
            p.redraw();
        }
    }

    async function partition(array, low, high) {
        const pivot = array[high];
        i = low - 1;
        for (let j = low; j < high; j++) {
            if (p._setupDone) {
                p.clear();
            }
            if (array[j] < pivot) {
                i++;
                swap(j, i);
                p.redraw();
                while (!shouldContinue) {
                    await new Promise(r => setTimeout(r, delay));
                }
                await new Promise(r => setTimeout(r, delay));
            }
        }
        swap(high, i + 1);
        if (p._setupDone) {
            p.clear();
        }
        p.redraw();
        while (!shouldContinue) {
            await new Promise(r => setTimeout(r, delay));
        }
        await new Promise(r => setTimeout(r, delay));
        return i + 1;
    }

    function isSorted(array) {
        for (let k = 1; k < array.length - 1; k++) {
            if (array[k] > array[k + 1]) {
                return false;
            }
        }
        return true;
    }

}