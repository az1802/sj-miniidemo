module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
// Mongoose 有以下几种类型Number（数字）String（字符串）
// Boolean（布尔值）ObjectId（对象ID）Array（数组）Object（对象，Date（日期）
  const UserSchema = new Schema({
    name: { type: String },
  });

  return mongoose.model('user', UserSchema, 'user');// 就是这，指定集合名。
};