/**
 * 根据传入的模板路径生成视图
 * @param {string} path 模板路径 
 */
function compile(path) {
    //判断模板文件格式
    var pathArray = path.split('.');
    if (pathArray[pathArray.length - 1] !== 'laz') {
        throw new Error('文件格式不正确，请传入laz后缀文件');
    }
    //尝试读取模板文件内容
    var template;
    const fs = require('fs');
    try {
        if (!fs.existsSync(path)) {
            throw new Error('该路径文件不存在');
        }
        template = fs.readFileSync(path, 'utf8');
    }
    catch (e) {
        throw new Error('编译模板读取失败');
    }
    //根据模板字段内容进行替换
    var evalExpr = /#{(.+?)}/g;
    var expr = /<%([\s\S]+?)%>/g;

    template = template
        .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
        .replace(expr, '`); \n $1 \n  echo(`');

    template = 'echo(`' + template + '`);';
    //执行脚本代码
    var script =
        `(function parse(data){
            var output = "";

            function echo(html){
                if(typeof html ==="object"){
                    output += JSON.stringify(html);
                }
                else{
                    output += html;
                }
            }

            ${template}

            return output;
        })`;
    //尝试执行字符串脚本
    var message;
    try {
        message = eval(script);
    }
    catch (e) {
        return console.error('编译失败');
    }
    return message;
}

module.exports = {
    compile
};