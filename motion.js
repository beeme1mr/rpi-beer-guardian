const arch = require('os').arch();

const Timer = require("./timer");
const Screen = require("./screen");
const keyboard = require("./keyboard");

class Motion {
    constructor(pin) {
        this.pin = pin;
        if (this.isArm()) {
            this.rpio = require("rpio");
        
            this.rpio.open(pin, this.rpio.INPUT);
        } else {
            console.log("Non ARM system detected.");
            this._mockValue = 1;
        }
    }

    async start() {
        this.timer = new Timer();
        this.screen = new Screen();
        await this.screen.animateOn();
        if (this.isArm()) {
            this.rpio.poll(this.pin, this.action.bind(this));
        }
    }

    readPin() {
        if(this.isArm()) {
            return this.rpio.read(this.pin);
        } else {
            return this._mockValue
        }
    }

    async action() {
        if (this.readPin()) {
            console.log("Movement detected!");
            this.timer.stopTimer();
            await this.screen.animateOn();
            keyboard.animateIn();
        } else {
            console.log("They gone!");
            keyboard.animateBack();
            this.timer.startTimer(() => {
                console.log("timer ended!");
                keyboard.animateOut()
                this.screen.animateOff();
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
