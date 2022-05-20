const Controller = require('egg').Controller;
let index = 1;
class UserController extends Controller {
  async index() {
    const { ctx } = this;
    let User = ctx.model.User;
    let user_a = new User({
      name:"bbbbbbbbb"+(index++)
    })
    // console.log(user_a.save())
    await user_a.save()
    const res = await User.find()
    console.log(res);
    ctx.body = res;
  }
}

module.exports = UserController;