import GBK from "gbk.js";

const utils = {
  encodeURI: (str: string) => {
    return encodeURI(str);
  },
  encodeResourceURI: (str: string) => {
    const SERVER_LANG = import.meta.env.VITE_SERVER_LANG;
    if (SERVER_LANG === 'en_US.UTF-8') {
      const uri = GBK.URI.encodeURI(decodeURI(str));
      return uri;
    }
    return encodeURI(str);
  }
}

export default utils;