const arch = require('os').arch();

const Timer = require("./timer");
const Screen = require("./screen");

class Motion {
    constructor(pin) {
        this.pin = pin;
        if (this.isArm()) {
            this.rpio = require("rpio");
        
            this.rpio.open(pin, rpio.INPUT);
        } else {
            console.log("Non ARM system detected.");
            this._mockValue = 1;
        }
    }

    start() {
        if (this.isArm()) {
            this.rpio.poll(PIR_PIN, action);
        }
        this.timer = new Timer();
        this.screen = new Screen();
    }

    readPin() {
        if(this.isArm()) {
            return rpio.read(this.pin);
        } else {
            return this._mockValue
        }
    }

    async action() {
        if (this.readPin()) {
            console.log("Person detected");
            this.timer.stopTimer();
            await this.screen.animateOn();
        } else {
            console.log("They gone!");
            const screen = this.screen;
            this.timer.startTimer(() => {
                console.log("timer ended!");
                screen.animateOff();
            });
        }
    }

    exit() {
        this.timer.stopTimer()
        return this.screen.animateOn();
    }

    setMockValue(input) {
        this._mockValue = input;
    }
    
    isArm() {
        return arch === "arm";
    }
}

module.exports = Motion;
