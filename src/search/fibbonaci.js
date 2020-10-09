export default function sketch(p) {
    var _ = require('lodash');
    let values, targetElement, canvas, speed;
    let height = window.innerHeight - 45,
        width = 85 / 100 * window.innerWidth - 20,
        stepCounter = 0,
        barWidth = 20,
        fibLow = 0,
        fibHigh = 1,
        fib = 0,
        offset = -1,
        current = 0,
        elementFound = false,
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
        if (values && values[0] === targetElement) {
            elementFound = true;
            current = 0;
            fibLow = 0;
            fibHigh = 0;
        }
        drawArray();
        incrementIndeces();
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        if (!_.isEmpty(_.xor(values, newProps.values))) {
            values = newProps.values.sort((a, b) => a - b);
            console.log(newProps.targetElement);
            while (fib < values.length) {
                fib = fibLow + fibHigh;
                if (fib < values.length) {
                    fibLow = fibHigh;
                    fibHigh = fib;
                }
            }
            current = Math.min(offset + fibLow, values.length - 1);
        }
        speed = newProps.speed;
        targetElement = newProps.targetElement;
        barWidth = width / values.length;
        p.frameRate(speed);
        newProps.start ? p.loop() : p.noLoop();
        if (newProps.nextStep !== nextStep) {
            p.redraw();
            nextStep = newProps.nextStep;
        }
    }

    function drawArray() {
        if (barWidth < 50) {
            p.textSize(barWidth / 2);
        } else {
            p.textSize(barWidth / 4);
        }
        for (let k = 0; k <= values.length; k++) {
            if (k >= offset + fibLow && k <= offset + fibHigh) {
                p.fill(255, 140, 0);
            }
            if (current === k) {
                p.fill(0, 0, 255);
            }
            p.rect(k * barWidth, height - (values[k] / 100 * height), barWidth, height);
            p.stroke(255, 255, 255);
            p.fill(255, 255, 255);
            p.text(values[k], k * barWidth, height - (values[k] / 100 * height) + 20, barWidth);
            p.fill(20, 20, 20);
        }
        p.textSize(32);
        p.text(stepCounter, 50, 30);
        p.text(`Element found: ${elementFound}`, 500, 30)
    }

    function incrementIndeces() {
        if (elementFound) {
            p.noLoop();
        }

        if (values[current] === targetElement) {
            elementFound = true;
        } else if (values[current] < targetElement) {
            fib = fibHigh;
            fibHigh = fibLow;
            fibLow = fib - fibHigh;
            offset = current;
        } else if (values[current] > targetElement) {
            fib = fibLow;
            fibHigh = fibHigh - fibLow;
            fibLow = fib - fibHigh;
        };
        current = Math.min(offset + fibLow, values.length - 1);
    }

}