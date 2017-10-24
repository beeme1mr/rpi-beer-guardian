const kb = require("node-key-sender");

class keyboard {
  static animateIn() {
    kb.sendKey("a");
  }

  static animateOut() {
    kb.sendKey("h");
  }

  static animateBack() {
    kb.sendKey("r");
  }
}

module.exports = keyboard;
