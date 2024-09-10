"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

const fs = require("fs");
const path = require("path");

/**
 * Copy a folder and files in it recursively
 * @param {*} source
 * @param {*} target
 * @param {string[]|undefined} excludeList files or folders to escape being copied
 */
function copyFolderSync(source, target, _excludeList) {
  const excludeList = _excludeList || [];
  // create the target folder if it doesn't exist
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  // read the files in the source folder
  fs.readdirSync(source).forEach((file) => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    // copy it recursively if it is a folder and not in the exclude list
    if (fs.statSync(sourcePath).isDirectory() && !excludeList.includes(file)) {
      copyFolderSync(sourcePath, targetPath, excludeList);
    } else if (!excludeList.includes(file)) {
      // if it is a file and not in the exclude list, copy it directly
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

/**
 * Delete a folder and files in it recursively
 * @param {*} folderPath
 * @param {string[]|undefined} excludeList files or folders to escape being deleted
 * @param {Object} options
 * @param {boolean} options.deleteRoot whether to delete the root folder itself, default is true
 */
function deleteFolderRecursive(folderPath, _excludeList, { deleteRoot = true } = {}) {
  const excludeList = _excludeList || [];
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (!excludeList.includes(file)) {
        // escape the file or folder
        if (fs.lstatSync(curPath).isDirectory()) {
          // delete subfolders recursively
          deleteFolderRecursive(curPath, excludeList, { deleteRoot: true });
        } else {
          // delete folder files
          fs.unlinkSync(curPath);
        }
      }
    });
    // delete empty folders if deleteRoot is true
    if (deleteRoot) {
      fs.rmdirSync(folderPath);
    }
  }
}

/**
 * 
 * @param {string} folderPath
 * @param {RegExp} includeList
 * @param {string[]} excludeDictories
 */
function deleteFilesMatch(folderPath, includeList, excludeDictories = []) {
  // 将正则表达式字符串转换为正则表达式对象
  const regex = new RegExp(includeList);

  // 读取文件夹内容
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`无法读取文件夹: ${err}`);
      return;
    }

    // 遍历文件列表
    files.forEach(file => {
      const filePath = path.join(folderPath, file);

      // 获取文件状态
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`无法获取文件状态 ${filePath}: ${err}`);
          return;
        }

        if (stats.isDirectory() && !excludeDictories.includes(filePath.substring(filePath.lastIndexOf(path.sep) + 1))) {
          // 递归遍历子文件夹
          deleteFilesMatch(filePath, includeList);
        } else if (regex.test(file)) {
          // 删除匹配的文件
          fs.unlink(filePath, err => {
            if (err) {
              console.error(`无法删除文件 ${filePath}: ${err}`);
            } else {
              console.log(`已删除文件: ${filePath}`);
            }
          });
        }
      });
    });
  });
}

/**
 * 
 * @param {string} folderPath 
 * @param {string[]} extList like ["ts", "tsx"]
 * @param {string[]} excludeList like ["d.ts"]
 * @param {string[]} excludeDictories like ["node_modules"]
 */
function deleteFilesMatchExt(folderPath, extList, excludeList, excludeDictories) {
  // 构建正则表达式
  // const extRegex = new RegExp(`\\.(${extList.join('|')})$`);
  // const excludeRegex = new RegExp(`\\.(${excludeList.join('|')})$`);

  // 组合正则表达式，排除 excludeList 中的扩展名
  const combinedRegex = new RegExp(`^(?!.*(${excludeList.join('|')})$).*(${extList.join('|')})$`);

  // 调用第一个方法
  deleteFilesMatch(folderPath, combinedRegex, excludeDictories);
}

module.exports = {
  copyFolderSync,
  deleteFolderRecursive,
  deleteFilesMatch,
  deleteFilesMatchExt,
};
