const Motion = require("./motion");

const motion = new Motion(11);
(async () => {
  try {
    console.log("Starting Raspberry Pi Beer Guardian controller")
    await motion.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();

process.on("SIGINT", async function() {
  console.log("Shutting down the Beer Gaurdian controller");
  await motion.exit();
  process.exit();
});
