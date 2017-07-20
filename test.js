
var fs = require('fs');
var { compile } = require('./laziest');
var view = compile('./template.laz');
var write = view({ supplies: [ "broom", "mop", "cleaner" ] });
fs.writeFileSync('output.js',write);