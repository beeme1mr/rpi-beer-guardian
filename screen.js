const path = require("path");
const util = require("util");
const fs = require("fs");

const keyboard = require("./keyboard");

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

const sleep = require("./sleep");

const backlightPath = "/sys/class/backlight/rpi_backlight";

class Backlight {
  constructor() {
    if (!fs.existsSync(backlightPath)) {
      throw new Error(
        "Backlight control not supported (" + backlightPath + " does not exist)"
      );
    }
  }

  powerOn() {
    return writeValue("bl_power", "0");
  }

  powerOff() {
    return writeValue("bl_power", "1");
  }

  async animateOn() {
    await this.powerOn();
    const max = await this.getMaxBrightness();
    await this.animate(max);
    keyboard.animateOn();
  }

  async animateOff() {
    keyboard.animateOut();
    await this.animate(0);
    await this.powerOff();
  }

  async isPoweredOn() {
    const powerValue = await readValue("bl_power");
    return parseInt(powerValue, 10) === 0;
  }

  async animate(value) {
    const maxBrightnessValue = await this.getMaxBrightness();
    let currentValue = await this.getBrightness();
    while (value !== currentValue) {
      currentValue = currentValue > value ? currentValue - 1 : currentValue + 1;
      await this.setBrightness(currentValue);
      await sleep(1);
    }
  }

  async getBrightness() {
    const brightnessValue = await readValue("actual_brightness");
    return parseInt(brightnessValue, 10);
  }

  async setBrightness(value) {
    const maxBrightnessValue = await this.getMaxBrightness();
    const v = value > maxBrightnessValue ? maxBrightnessValue : value;
    return writeValue("brightness", v);
  }

  async getMaxBrightness() {
    const maxBrightness = await readValue("max_brightness");
    return parseInt(maxBrightnessValue, 10);
  }
}

function writeValue(fileName, value) {
  return writeFile(path.join(backlightPath, fileName), value);
}

function readValue(fileName, value) {
  return readFile(path.join(backlightPath, fileName), value);
}

module.exports = Screen;
