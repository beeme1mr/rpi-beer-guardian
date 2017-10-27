const rpio = require("rpio");

const Screen = require("./screen");
const Timer = require("./timer");
const keyboard = require("./keyboard");

const screen = new Screen();
const timer = new Timer();

const PIR_PIN = 11;

rpio.open(PIR_PIN, rpio.INPUT);
rpio.poll(PIR_PIN, motionDetected);

async function motionDetected() {
  if (rpio.read(PIR_PIN)) {
    console.log("Person detected");
    timer.stopTimer();
    await screen.animateOn();
  } else {
    console.log("They gone!");
    // reset display to home screen
    keyboard.animateBack();
    timer.startTimer(screen.animateOff);
  }
}

process.on("SIGINT", async function() {
  console.log("Exiting the script");
  await screen.animateOn();
  process.exit();
});
