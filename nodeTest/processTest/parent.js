console.log("parent process");

process.on("message", (data) => {
  console.log(`parent 接受消息--${data}`);
});

process.send("patent 发动的消息");
