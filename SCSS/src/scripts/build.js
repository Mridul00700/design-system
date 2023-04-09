const fs = require('fs');
const path = require('path');
const sass = require("node-sass");
// const { resolve } = require('path');

const result = sass.renderSync({
    data: fs.readFileSync(path.resolve('src/global.scss')).toString(),
    outputStyle: 'expanded',
    outFile: 'global.css',
    includePaths: [path.resolve('src')]
})

// console.log(result.css.toString());

fs.writeFileSync(path.resolve('src/lib/global.css'), result.css.toString());