# laziest(仍未完成)
一个利用es6的模板字符串功能封装实现的模板引擎
### 安装方法
```javascript
npm i laziest
```
### 使用方法
```javascript
const laziest = require('laziset');
const fs = require('fs');
var view = laziest.compile(template);
fs.writeFileSync('file.js',view);
```

