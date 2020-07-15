const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  console.log('Building elements...');

  const rootFolder = './dist/headerbar';
  const destFolder = './elements';
  const prjctName = "headerbar";
  const files = [

    `${rootFolder}/runtime-es2015.js`,
    `${rootFolder}/polyfills-es2015.js`,
    `${rootFolder}/main-es2015.js`,
  ];

  await fs.ensureDir(destFolder);

  await concat(files, `${destFolder}/headerbar.js`);
  fs.readFile(`${destFolder}/headerbar.js`, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/webpackJsonp/g, 'webpackJsonp'+prjctName);
    fs.writeFile(`${destFolder}/headerbar.js`, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
  await fs.copyFile(`${rootFolder}/styles.css`, `${destFolder}/styles.css`);

  await fs.copy(rootFolder, destFolder,
    {
      filter:
        function (src, dest) {
          return src.indexOf('.js') === -1 && src.indexOf('styles.css') === -1;
        }
    });

  console.log('Finished building elements.')
})()
