const path = require('path');
const { deleteFolderRecursive, copyFolderSync } = require('./utils.cjs');

const sourceDir = path.join(__dirname, '../dist');
const targetDir = path.join(process.env.NGINX_HOME, 'html', 'cs2-notebook');

// 执行删除和复制操作
try {
  deleteFolderRecursive(targetDir);
  copyFolderSync(sourceDir, targetDir);
  console.log('部署成功');
} catch (err) {
  console.error('操作失败:', err);
}