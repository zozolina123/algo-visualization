export default function sketch(p) {
    var _ = require('lodash');
    let values, targetElement, canvas, speed;
    let height = window.innerHeight - 45,
        width = 85 / 100 * window.innerWidth - 20,
        stepCounter = 0,
        barWidth = 20,
        low = 0,
        high = values ? values.length - 1 : 10000,
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
            low = 0;
            high = 0;
        }
        drawArray();
        incrementIndeces();
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        if (!_.isEmpty(_.xor(values, newProps.values))) {
            values = newProps.values.sort((a, b) => a - b);
            high = values.length;
            current = Math.round((low + high) / 2);
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
            if (k >= low && k <= high) {
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
        if (elementFound || low === high) {
            p.noLoop();
        }
        current = Math.round((low + high) / 2);
        console.log(targetElement);

        if (values[current] === targetElement) {
            elementFound = true;
        } else if (values[current] < targetElement) {
            low = current;
        } else if (values[current] > targetElement) {
            high = current
        };
    }

}