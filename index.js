const Motion = require("./motion");

try {
  const motion = new Motion(11);
  motion.start();
} catch (err) {
  console.log(err);
  process.exit(1);
}

process.on("SIGINT", async function() {
  console.log("Exiting the script");
  await motion.exit();
  process.exit();
});
