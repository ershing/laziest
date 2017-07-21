//引入laziest模块
const laziest = require('../laziest');
//使用compile方法编译模板
var view = laziest.compile('./template.laz');
//引入数据内容
var data = require('./studentList.json');
//生成内容
var output = view(data);
//将内容写入文件
const fs = require('fs');
fs.writeFileSync('output.json',output);