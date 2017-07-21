# Laziest
一个利用es6的模板字符串功能封装实现的模板引擎
### 安装方法
```javascript
npm i laziest
```
### 使用方法
```javascript
//引入laziest模块
const laziest = require('laziest');
//使用compile方法编译模板
var view = laziest.compile(templatePath);
//引入数据内容
var data = require(dataPath);
//生成内容
var output = view(data);
//将内容写入文件
const fs = require('fs');
fs.writeFileSync(filePath,output);
```
### 模板语法
```javascript
<% javascript 代码 %>  //插入javascript代码
#{ 变量名称 }  //插入变量值
```
### 例子详解
**已拥有数据文件[studentList.json](https://github.com/ershing/laziest/blob/master/example/studentList.json),内容如下：**
```json
[
    {
        "name": "Jack",
        "sex": "male",
        "age": 12
    },
    {
        "name": "Rose",
        "sex": "female",
        "age": 13
    },
    {
        "name": "Kate",
        "sex": "female",
        "age": 11
    }
]
```
**希望生成[output.json](https://github.com/ershing/laziest/blob/master/example/output.json)文件，内容如下：**
```json
[
    {
        "index":1,
        "introduction":"my name is Jack,my sex is male and my age is 12"
    },
    {
        "index":2,
        "introduction":"my name is Rose,my sex is female and my age is 13"
    },
    {
        "index":3,
        "introduction":"my name is Kate,my sex is female and my age is 11"
    }
]
```
**编写模板代码过程如下：**
先观察生成文件结构，知道是循环输出，然后开始新建模板。<br>
新建一个模板[template.laz](https://github.com/ershing/laziest/blob/master/example/template.laz)（注意后缀名称是laz），忽略变量和循环，初步框架内容如下：
```javascript
[
    {
        "index":,
        "introduction":"my name is ,my sex is  and my age is "
    }
]
```
然后开始通过#{ }符号添加常规变量：
```javascript
[
    {
        "index":,
        "introduction":"my name is #{ele.name},my sex is #{ele.sex} and my age is #{ele.age}"
    }
]
```
最后再通过<% %>符号插入含有逻辑的js代码，用法类似js代码中插入php代码，注意中间输出部分不能放置在<% %>中,如中间有输出，则需要将js代码前半部分用%>闭合，中间填写输出内容（可用#{ }对变量取值），再用<%开始后半部分，如下：
```javascript
[<%data.forEach((ele,index)=>{%>
    {
        "index":#{index+1},
        "introduction":"my name is #{ele.name},my sex is #{ele.sex} and my age is #{ele.age}"
    }<%if(index < data.length-1 ){%>,<%}else%><%})%>
]
```
**在[generate.js](https://github.com/ershing/laziest/blob/master/example/generate.js)文件中编写生成代码如下：**
```javascript
//引入laziest模块
const laziest = require('laziest');
//使用compile方法编译模板
var view = laziest.compile('./template.laz');
//引入数据内容
var data = require('./studentList.json');
//生成内容
var output = view(data);
//将内容写入文件
const fs = require('fs');
fs.writeFileSync('output.json',output);
```
### License
MIT License
