const kb = require("node-key-sender");

class keyboard {
  static animateIn() {
    kb.sendkey("a");
  }

  static animateOut() {
    kb.sendkey("h");
  }

  static animateBack() {
    kb.sendkey("r");
  }
}

module.exports = keyboard;
