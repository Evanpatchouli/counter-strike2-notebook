const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../dist');
const targetDir = path.join(process.env.NGINX_HOME, 'html', 'cs2-notebook');

// 删除目标文件夹
const deleteFolderRecursive = (folderPath) => {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
  }
};

// 复制文件夹
const copyFolderRecursive = (source, target) => {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  fs.readdirSync(source).forEach((file) => {
    const curSource = path.join(source, file);
    const curTarget = path.join(target, file);

    if (fs.lstatSync(curSource).isDirectory()) {
      copyFolderRecursive(curSource, curTarget);
    } else {
      fs.copyFileSync(curSource, curTarget);
    }
  });
};

// 执行删除和复制操作
try {
  deleteFolderRecursive(targetDir);
  copyFolderRecursive(sourceDir, targetDir);
  console.log('部署成功');
} catch (err) {
  console.error('操作失败:', err);
}