import { Fragment, useEffect, useRef } from "react";
import AnchorList from "../../components/anchor-list";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Layouts from "../../layouts";
import Article from "./article";
import "./doc.css";
import { useLocation } from "react-router";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import Navigation from "@mui/icons-material/Navigation";
import PrintIcon from "@mui/icons-material/Print";
import MenuBook from "@mui/icons-material/MenuBook";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import ShareIcon from "@mui/icons-material/Share";
import msg from "../../hooks/msg";
import sleep from "../../hooks/sleep";
import { useInject } from "@evanpatchouli/react-hooks-kit";
import DocActions from "./doc-actions";

const Main = () => {
  const printContent = async () => {
    const printArea = document.createElement("div");
    msg.info("将打开打印器，请稍等片刻", 1000);
    await sleep(1500);
    try {
      const atc = document.querySelector<HTMLDivElement>(".cs2-notebook-article");
      const root = document.querySelector<HTMLDivElement>("#root") as HTMLDivElement;
      if (atc) {
        root?.remove();
        printArea.appendChild(atc.cloneNode(true));
        document.body.appendChild(printArea);
        window.print();
        document.body.removeChild(printArea);
        document.body.appendChild(root);
      } else {
        msg.error("未找到可打印的内容");
      }
    } catch (error) {
      msg.error(`打印遇到了一处异常: ${(error as Error).message}`);
    } finally {
      if (printArea.parentNode) {
        document.body.removeChild(printArea);
      }
    }
  };
  const [, setShowLeftSideBar] = useInject("showLeftSideBar", {
    namespace: "docs",
  });
  const [, setShowRightSideBar] = useInject("showRightSideBar", {
    namespace: "docs",
  });

  const actions = [
    {
      icon: (
        <Navigation
          sx={{
            rotate: "180deg", // to bottom
          }}
        />
      ),
      name: "前往底部",
      callback: () => {
        bodyElemRef.current?.scrollTo({ top: bodyElemRef.current?.scrollHeight, behavior: "smooth" });
      },
    },
    {
      icon: <Navigation />,
      name: "回到顶部",
      callback: () => {
        bodyElemRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
    {
      icon: <PrintIcon />,
      name: "打印本页", // 打印文章主题为 pdf
      callback: () => {
        printContent();
      },
    },
    {
      icon: <MenuOutlined />,
      name: "文档大纲",
      callback: () => {
        setShowRightSideBar(true);
      },
    },
    {
      icon: <MenuBook />,
      name: "文集目录",
      callback: () => {
        setShowLeftSideBar(true);
      },
    },
    {
      icon: <ShareIcon />,
      name: "分享本站",
      callback: () => {
        navigator.clipboard.writeText(window.location.href);
        msg.success("已将当前页面链接复制到剪贴板");
      },
    },
  ];

  const url = useLocation();
  const bodyElemRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const bodyElem = document.getElementById("layout-double-wings-body");
    bodyElemRef.current = bodyElem;
  }, []);

  useEffect(() => {
    bodyElemRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [url.pathname]);
  return (
    <Fragment>
      <Article />
      <DocActions />
      <SpeedDial
        className="not-print"
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.callback} />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default function Doc() {
  const url = useLocation();
  const path = decodeURIComponent(
    url.pathname
      .replace(/^.*\/notes\//, "")
      .split("/")
      .pop() || ""
  );
  useEffect(() => {
    document.title = `${path} - CS2 笔记本`;
    return () => {
      document.title = "CS2 笔记本";
    };
  }, [path]);
  return (
    <Layouts.DoubleWings header={<Header />}>
      <Sidebar />
      <Main />
      <AnchorList />
    </Layouts.DoubleWings>
  );
}
