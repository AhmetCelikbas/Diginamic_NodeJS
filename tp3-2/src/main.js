const fs = require('fs-extra');
const datasource = require('./services/data.service');
const tempFolderPath = './temp';
const outputFilePath = `${tempFolderPath}/pubs.json`;



function pathExist(path) {
  return fs.pathExists(path);
}

function remove(path) {
  return fs.remove(path);
}

function createFolder(path) {
  return fs.ensureDir(path);
}

function exportDataSourceToJsonFile(outputFilePath, datasource) {
  return fs.writeJson(outputFilePath, datasource);
}

function watcher(FileToWatchPath) {
  fs.watchFile(FileToWatchPath, (curr, prev) => {
    console.log(`the current mtime is: ${curr.mtime}`);
    console.log(`the previous mtime was: ${prev.mtime}`);
  });
}

function init() {
  pathExist(tempFolderPath).then((isPathExists) => {
    if(isPathExists) {
      console.log(`'${tempFolderPath}' allready exist. Removing folder...`);
      remove(tempFolderPath).then(() => {
        console.log(`'${tempFolderPath}' removed. Creating folder '${tempFolderPath}' again ...`);
        createFolder(tempFolderPath).then(() => {
          console.log(`'${tempFolderPath}' created`);
          exportDataSourceToJsonFile(outputFilePath, datasource).then(() => {
            console.log(`'${outputFilePath}' created`);
            watcher(outputFilePath);
          });
        });
      });
    } else {
      console.log(`${tempFolderPath} does not exist. Creating it ...`);
      createFolder(tempFolderPath).then(() => {
        console.log(`'${tempFolderPath}' created`);
        exportDataSourceToJsonFile(outputFilePath, datasource).then(() => {
          console.log(`'${outputFilePath}' created`);
          watcher(outputFilePath);
        });
      });
    }


  }).catch((e) => {
    console.log(e.message);
  })
}



module.exports = init;