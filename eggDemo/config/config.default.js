exports.keys = 'sunjie'
// 添加 view 配置
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};
exports.news = {
  pageSize: 5,
  serverUrl: 'https://hacker-news.firebaseio.com/v0',
};

exports.mongoose = {
  url: 'mongodb://127.0.0.1/sjTest',
  options: {},
  plugins: [],
};


exports.middleware =['test']