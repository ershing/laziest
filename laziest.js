
function compile(path) {
    var fs = require('fs');
    var template = fs.readFileSync(path, 'utf8');
    var evalExpr = /#{(.+?)}/g;
    var expr = /<%([\s\S]+?)%>/g;

    template = template
        .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
        .replace(expr, '`); \n $1 \n  echo(`');

    template = 'echo(`' + template + '`);';

    var script =
        `(function parse(data){
            var output = "";

            function echo(html){
                output += html;
            }

            ${template}

            return output;
        })`;
    return eval(script);
}

module.exports = {
    compile
};