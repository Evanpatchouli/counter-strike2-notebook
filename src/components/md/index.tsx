/* eslint-disable @typescript-eslint/ban-ts-comment */
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { base16AteliersulphurpoolLight as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import classNames from "classnames";
import rehypeRaw from "rehype-raw";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/atom-one-dark.css";
import "./index.css";
import CopyButton from "../copy-button";
import Img from "../Img";

export default function Md({ children }: { children: string }) {
  const style = {
    ...theme,
  };
  return (
    <Markdown
      rehypePlugins={[rehypeRaw]}
      components={{
        // 不用原先的 pre，因为我要相对定位粘贴按钮，非代码块的 code 不会自带被 pre 包裹，所以统一在 code 渲染时包裹一个 pre
        pre: ({ children }) => <>{children}</>,
        code: ({ children = [], className, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return (
            <pre className="markdown-pre">
              {/** @ts-ignore  */}
              <SyntaxHighlighter
                language={match?.[1]}
                showLineNumbers={true}
                PreTag="div"
                className="syntax-hight-wrapper"
                {...props}
                style={style}
              >
                {(children as string).trim()}
              </SyntaxHighlighter>
              <CopyButton code={children as string} />
            </pre>
          );
        },
        h1: ({ children = [], className }) => (
          <h1 className={classNames(["markdown-title"], className)} id={`${children}`}>
            {children}
          </h1>
        ),
        h2: ({ children = [] }) => <h2 id={children as string}>{children}</h2>,
        h3: ({ children = [] }) => <h3 id={children as string}>{children}</h3>,
        h4: ({ children = [] }) => <h4 id={children as string}>{children}</h4>,
        h5: ({ children = [] }) => <h5 id={children as string}>{children}</h5>,
        h6: ({ children = [] }) => <h6 id={children as string}>{children}</h6>,
        // h2: ({ children = "" }) => <a href={'#'+children}><h2 id={`${children}`}>{children}</h2></a>,
        // h3: ({ children = "" }) => <a href={'#'+children}><h3 id={`${children}`}>{children}</h3></a>,
        // h4: ({ children = "" }) => <a href={'#'+children}><h4 id={`${children}`}>{children}</h4></a>,
        // h5: ({ children = "" }) => <a href={'#'+children}><h5 id={`${children}`}>{children}</h5></a>,
        // h6: ({ children = "" }) => <a href={'#'+children}><h6 id={`${children}`}>{children}</h6></a>,
        img: ({ alt, ...props }) => (
          <figure className="markdown-img-wrapper">
            <Img width="100%" height="auto" {...props} />
            <figcaption>{alt}</figcaption>
          </figure>
        ),
        blockquote: ({ children }) => (
          <blockquote className="markdown-blockquote">
            {children}
            <div className="markdown-blockquote-shadow">{children}</div>
          </blockquote>
        ),
        a: ({ children = [], href: _href, target: _target, ...props }) => {
          const isTargetBlank = _href?.endsWith("target=_blank");
          const href = isTargetBlank ? _href?.replace("?target=_blank", "") : _href;
          const target = isTargetBlank ? "_blank" : _target;
          return (
            <a href={href} target={target} {...props}>
              {children}
            </a>
          );
        },
      }}
    >
      {children}
    </Markdown>
  );
}
