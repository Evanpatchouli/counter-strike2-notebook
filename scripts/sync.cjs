const fs = require('fs');
const path = require('path');
const { deleteFolderRecursive, copyFolderSync } = require('./utils.cjs');

const sourceDir = path.join(__dirname, '../dist');
const targetDir = path.resolve("D:/Work/cs2-notebook-dist");

try {
  deleteFolderRecursive(targetDir, ['.env', '.git'], { deleteRoot: false });
  copyFolderSync(sourceDir, targetDir);
  console.log('同步成功');
} catch (error) {
  console.error('操作失败:', error);
}