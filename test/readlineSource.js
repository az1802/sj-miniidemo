const InputPrompt = require("inquirer/lib/prompts/input");

function stepRead(cb){
  let {stdin:input,stdout:output} = process;
  let line = '';



  function onkeypress(ch){
      output.write(ch);
      line+=ch;
      switch(ch){
        case '\r':
          input.pause();
          cb(line);
          line = ''
          break;
      }
  }

  emitKeypressEvents(input);
  input.on('keypress',onkeypress);
  input.setRawMode(true);
  input.resume()
}


function emitKeypressEvents(stream){
  const g = emitKeys(stream);
  g.next();



  function onData(chunk){
    g.next(chunk.toString())
  }

  stream.on('data',onData)
}


function* emitKeys(stream){
  while(true){
    let c = yield;
    stream.emit('keypress',c)
  }
}


stepRead(s=>{
  console.log('line---',s)
})