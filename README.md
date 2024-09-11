# CS2-NOTEBOOK

This is a notebook for the CS2. It is a collection of notes, code, and examples that I have created to help me better in CS2. I hope that it can help you too!

You can read it online at:

- <http://124.221.85.140/cs2-notebook>
- <https://evanpatchouli.github.io/cs2-notebook>

## Develop

To develop this notebook, you will need to have node installed.

**Install dependencies**

```bash
npm install
```

**Start the development server**

```bash
npm run dev
```

**Build the notebook**

```bash
npm run build
```

**Ather scripts**

- deploy: Deploy the notebook to nginx locally.
- sync: Sync the notebook with the dist-repo. Just for me.

## Deploy

If you want to deploy this notebook on your own server, you can use the following steps.

**Example of Nginx**

1. Create a new directory `cs2-notebook` on your server.
2. Copy all the files from dist to the `cs2-notebook` directory.
3. Update your nginx conf with the following content:

```nginx
server {
    location /cs2-notebook/ {
        root /path/to/cs2-notebook;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

4. If your server's locale is not `zh_CN.UTF-8`, for example of `en_US.UTF-8`: reate a `.env` file in the root of the `cs2-notebook` directory with the following content:

```env
VITE_SERVER_LANG=en_US.UTF-8
```

That because the function `encodeResourceURI` at `src\views\utils\index.ts` will encode the resource URI with `zh_CN.UTF-8` by default. If your server's locale is not `zh_CN.UTF-8`, you need to set the `VITE_SERVER_LANG` to your server's locale, and update the codes of `encodeResourceURI` at `src\views\utils\index.ts` to support your server's locale.
