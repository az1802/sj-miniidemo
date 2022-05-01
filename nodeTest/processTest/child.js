console.log("child process");

process.on("message", (data) => {
  console.log(`child 接受消息--${data}`);
});

process.send("child 发动的消息");
