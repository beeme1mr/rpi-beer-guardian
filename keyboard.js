const kb = require("node-key-sender");

class keyboard {
  static animateIn() {
    ks.sendCombination(["control", "a"]);
  }

  static animateOut() {
    ks.sendCombination(["control", "a"]);
  }

  static animateBack() {
    ks.sendCombination(["control", "a"]);
  }
}

module.exports = keyboard;
