/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SERVER_LANG: 'en_US.UTF-8' | 'zh_CN.UTF-8'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}