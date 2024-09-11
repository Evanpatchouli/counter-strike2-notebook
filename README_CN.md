# CS2-NOTEBOOK

这是一个 CS2 的笔记本。这是我为了帮助我更好地理解 CS2 而创建的一系列笔记、代码和示例。我希望它也能帮助到你！

你可以在线阅读它：

- <http://124.221.85.140/cs2-notebook>
- <https://evanpatchouli.github.io/cs2-notebook>

## 开发

要开发这个笔记本，你需要事先安装 node。

**安装依赖**

```bash
npm install
```

**启动开发服务器**

```bash
npm run dev
```

**构建笔记本**

```bash
npm run build
```

**其他脚本**

- deploy: 将笔记本部署到本地的 nginx 服务器。
- sync: 将笔记本与 dist-repo 同步。仅供我使用。

## 部署

如果你想在自己的服务器上部署这个笔记本，你可以按照以下步骤操作。

**Nginx 的示例**

1. 在你的服务器上创建一个新的目录 `cs2-notebook`。
2. 将 dist 目录中的所有文件复制到 `cs2-notebook` 目录中。
3. 使用以下内容更新你的 nginx 配置：

```nginx
server {
    location /cs2-notebook/ {
        root /path/to/cs2-notebook;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

4. 如果你的服务器的区域设置不是 `zh_CN.UTF-8`，例如 `en_US.UTF-8`：在 `cs2-notebook` 目录的根目录下创建一个 `.env` 文件，内容如下：

```env
VITE_SERVER_LANG=en_US.UTF-8
```

这是因为 `src\views\utils\index.ts` 中的 `encodeResourceURI` 函数默认会使用 `zh_CN.UTF-8` 对资源 URI 进行编码。如果你的服务器的区域设置不是 `zh_CN.UTF-8`，你需要将 `VITE_SERVER_LANG` 设置为你的服务器的区域设置，并更新 `src\views\utils\index.ts` 中的 `encodeResourceURI` 函数的代码以支持你的服务器的区域设置。
