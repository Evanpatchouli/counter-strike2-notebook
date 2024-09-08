import { createBrowserRouter, redirect } from "react-router-dom";
import Root from "./root";
import Doc from "./doc";
import tabs, { flattenTabs } from "../components/sidebar/tabs";
import ErrorPage from "./error";
import { AppError } from "./error/app-error";

const tabsFlatten = flattenTabs();

// 递归查找 tabs 中是否存在指定的 path
const findPathInTabs = (_tabs: typeof tabs, filepath: string) => {
  for (const tab of _tabs) {
    if (tab.path === filepath) {
      return true;
    }
    if (tab.children) {
      if (findPathInTabs(tab.children, filepath)) {
        return true;
      }
    }
  }
  return false;
};

type Heading = {
  level: number;
  content: string;
};

type HeadingStack = {
  level: number;
  children: Heading[];
};

/**
 * 分析 text 中的所有符合 markdown 格式的标题，忽略代码块中的标题和非标题的 #
 * @param text markdown 文本
 * @param excludeH1 是否排除 h1 标题，当文档中有多个 h1 标题时，不允许排除 h1
 * @returns {HeadingStack[]}
 */
const getHeadings = (text: string, excludeH1: boolean = false): HeadingStack[] => {
  // 移除代码块中的内容
  const codeBlockRegex = /```[\s\S]*?```/g;
  const cleanedText = text.replace(codeBlockRegex, "");

  const headings = [] as Heading[];
  const regex = /<(h[1-6])>(.*?)<\/\1>|^(#{1,6})\s+(.*)$/gm;
  let match;
  let h1Count = 0;

  while ((match = regex.exec(cleanedText)) !== null) {
    const level = match[1] ? parseInt(match[1].substring(1), 10) : match[3].length;
    const content = match[2] || match[4];
    if (level === 1) {
      h1Count++;
    }
    headings.push({ level, content });
  }

  // 如果有多个 h1 标题，则忽略 excludeH1 参数
  if (h1Count > 1) {
    excludeH1 = false;
  }

  // 过滤掉 h1 标题（如果 excludeH1 为 true）
  const filteredHeadings = excludeH1 ? headings.filter((h) => h.level !== 1) : headings;

  // 构建层级结构
  const buildHierarchy = (headings: Heading[]) => {
    const root = [] as HeadingStack[];
    const stack = [{ level: 0, children: root }];
    headings.forEach(({ level, content }) => {
      const item = { id: content, children: [] };
      while (stack[stack.length - 1].level >= level) {
        stack.pop();
      }
      stack[stack.length - 1].children.push(item);
      stack.push({ level, children: item.children });
    });
    return root;
  };

  return buildHierarchy(filteredHeadings);
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "notes/*",
          element: <Doc />,
          loader: async ({ params }) => {
            // console.log(params);
            let filepath = params["*"];
            if (!filepath) {
              filepath = tabsFlatten.find((item) => item.type === "button")?.path;
              if (filepath) {
                return redirect(encodeURI(`/notes/${filepath}`));
              }
              return {
                title: filepath,
                text: "笔记本里没有文档",
                headings: [],
              };
            }
            // 如果 filepath 以 .md, .html 结尾，则去掉
            if (filepath.endsWith(".md") || filepath.endsWith(".html")) {
              filepath = filepath.substring(0, filepath.lastIndexOf("."));
            }
            if (filepath.endsWith("/")) {
              filepath = filepath.substring(0, filepath.length - 1);
            }
            // 如果 tabs 中不存在该 path，则 throw 404 错误
            if (!findPathInTabs(tabs, filepath) && filepath !== "开发者日志") {
              const err = new AppError(`手册里没有《${filepath}》这份文档`, "doc-404");
              throw err;
            }
            const tabIdx = tabsFlatten.findIndex((item) => item.path === filepath);
            if (tabsFlatten[tabIdx]?.type === "dropdown") {
              // 查找该合集下的第一个文档
              const first_doc_filepath = tabsFlatten
                .slice(tabIdx + 1)
                .find((item) => item.type === "button" && item.path && item.path.startsWith(filepath as string))?.path;
              if (first_doc_filepath) {
                filepath = first_doc_filepath;
                return redirect(encodeURI(`/notes/${filepath}`));
              }
              return {
                title: filepath,
                text: "该合集下没有文档",
                headings: [],
              };
            }
            const res = await fetch(`/cs2-notebook/docs/${filepath}.md`);
            // console.log("res", res);
            const text = await res.text();
            // console.log("text", text);
            return {
              title: filepath,
              text: text,
              headings: getHeadings(text, true),
            };
          },
        },
      ],
    },
  ],
  {
    basename: "/cs2-notebook",
    // strict: true, // 严模式，URL 末尾不允许出现 /，例如 /about 和 /about/
  }
);

export default router;
