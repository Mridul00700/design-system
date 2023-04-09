const fs = require('fs');
const Path = require('path');
const sass = require("node-sass");
// const { resolve } = require('path');

const getComponents = () => {
    let allComponents = [];

    const types = ['atoms', 'molecules', 'organisms'];

    types.forEach(type => {
        const allFiles = fs.readdirSync(`src/${type}`).map(file => ({
            input : `src/${type}/${file}`,
            output : `src/lib/${file.slice(0, -4) + 'css'}`
        }
            ));


        allComponents = [
            ...allComponents,
            ...allFiles
        ]
    });

   

    return allComponents;
}



const compile = (path, fileName) => {
    
   const result = sass.renderSync({
    data: fs.readFileSync(Path.resolve(path)).toString(),
    outputStyle: 'expanded',
    includePaths: [Path.resolve('src')]
});

fs.writeFileSync(fileName, result.css.toString());

}

// console.log(result.css.toString());
// compile('src/global.scss', 'src/lib/global.css')
getComponents().forEach(component => {
    compile(component.input, component.output);
})
                    