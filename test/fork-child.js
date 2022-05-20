console.log('child process');

process.send('hello parent');

process.on('message',message=>{
  console.log(`child receive ${message}`)
})