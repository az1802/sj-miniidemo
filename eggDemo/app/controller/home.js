const Controller = require('egg').Controller;

class HomeController  extends Controller{
  async index(){
    const {ctx} = this;
    ctx.body = "hello world"
  }
}




module.exports = HomeController