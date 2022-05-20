var inquirer = require('inquirer');
inquirer
  .prompt([
    {
      type: "confirm",
      name: "yourName",
      message: "your name ",
      default: "R",
      choices: [{
        key: "R", value: "red",

      }, {
        key: "G", value: "green",
      }, {
        key: "B", value: "blue",

      }],
      askAnswered: true,
      // transformer(v){
      //   return `aaa${v}(input your name)`
      // },
      // filter(v){

      // }
    },
    {
      type: "number",
      name: "yourNameAaa",
      message: "your name ",
      default: "aaa",
      choices: ['aaa', 'sunj', 'bbb'],
      askAnswered: true,
    }
  ])
  .then((answers) => {
    console.log('answers: ', answers);
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });