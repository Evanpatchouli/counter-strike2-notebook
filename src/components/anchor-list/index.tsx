import { useLoaderData } from "react-router";
import { useClickAway, useProvide } from "@evanpatchouli/react-hooks-kit";
import { useState, useEffect } from "react";
import { ExitToAppOutlined } from "@mui/icons-material";
import { colors } from "@mui/material";
import "./index.css";
import useResize from "../../hooks/useResize";
import useTheme from "../../hooks/useTheme";

type Heading = { id: string; children?: Heading[] };

const renderAnchorList = (headings: Heading[]) => {
  return (
    <ul>
      {headings?.map((heading) => (
        <li key={heading?.id}>
          <a href={`#${heading?.id}`} className="anchor-list-item" title={heading.id}>
            {heading?.id}
          </a>
          {heading?.children && heading?.children?.length > 0 && renderAnchorList(heading?.children)}
        </li>
      ))}
    </ul>
  );
};

export default function AnchorList() {
  const theme = useTheme();
  const article = useLoaderData() as {
    title: string;
    text: string;
    headings: Heading[];
  };

  const [isWidthEnough, setIsWidthEnough] = useState(true);

  const size = useResize();
  useEffect(() => {
    if (size.width <= 1420 && size.width !== 0) {
      setIsWidthEnough(false);
    } else {
      setIsWidthEnough(true);
    }
  }, [size.width]);

  const [show, setShow] = useState(isWidthEnough);
  useEffect(() => {
    setShow(isWidthEnough);
  }, [isWidthEnough]);

  useProvide("showRightSideBar", show, {
    namespace: "docs",
    setState: setShow,
  });

  const bodyElemRef = useClickAway(() => {
    if (!isWidthEnough) {
      setShow(false);
    }
  });

  return (
    <div
      className="anchor-list-wrapper not-print"
      ref={bodyElemRef}
      style={{
        position: "fixed",
        right: show ? "1rem" : "-320px", // "1rem" 是为了避免与右侧的页面全局滚动条重叠
        transition: "right 0.3s ease-in-out",
        height: "calc(var(--content-height) - 8px)", // 8px 大概是由于 header 的边框及 padding 造成的偏差
        overflowY: "auto",
        borderLeft: `1px solid ${theme.borderColor}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <ExitToAppOutlined
          sx={{
            mr: "0.8rem",
            color: colors.grey[500],
            cursor: "pointer",
            transition: "color 0.1s ease-in-out",
            "&:hover": {
              color: colors.grey[800],
            },
          }}
          onClick={() => {
            setShow(false);
          }}
        />
        <header>文档大纲</header>
      </div>
      {renderAnchorList(article?.headings)}
    </div>
  );
}
