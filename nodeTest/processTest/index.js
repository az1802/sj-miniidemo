const path = require("path");

const cp = require("child_process");
const { exec, spawn, execFile, execSync, execFileSync, fork } = cp;
const handleCb = (err, stdout, stderr) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("stdout: ", stdout);
};
// let processObj = cp.exec(
//   "echo hello world",
//   {
//     // encoding: "buffer",
//     timeout: 0,
//   },
//   (err, stdout, stderr) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("stdout: ", stdout);
//   }
// );

// execFile("node", ["--version"], handleCb);
let processObj = execFile("ls", [], handleCb);
console.log("processObj: ", processObj);

// console.log("parent execArgv: " + process.execArgv);

// let childProcess = fork(path.join(__dirname, "child.js"), {
//   execArgv: process.execArgv,
// });
// let parentProcess = fork(path.join(__dirname, "parent.js"));

// childProcess.on("message", (data) => {
//   console.log(`index child 接受消息--${data}`);
// });
// childProcess.send("index child 传递的消息");

// parentProcess.on("message", (data) => {
//   console.log(`index parent 接受消息--${data}`);
// });
// parentProcess.send("index parent 传递的消息");

// const ls = spawn("lsd", ["-l"]);
// ls.stdout.on("data", (data) => {
//   console.log(`stdout ${data}`);
// });

// ls.stderr.on("data", (data) => {
//   console.log(`stderr ${data}`);
// });
// ls.on("clise", (data) => {
//   console.log(`close ${data}`);
// });
