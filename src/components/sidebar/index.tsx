import { Collapse, colors, List, ListItem, ListItemButton, ListItemText, ListSubheader } from "@mui/material";
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import { useClickAway, useMeta, useMount, useProvide } from "@evanpatchouli/react-hooks-kit";
import ExpandMore from "@mui/icons-material/ExpandMore";
import sleep from "../../hooks/sleep";
import React, { useEffect, useState } from "react";
import tabs from "./tabs";
import { ExitToAppOutlined } from "@mui/icons-material";
import useResize from "../../hooks/useResize";
import Blank from "../blank";

// const findIsChildrenSelected = (_tabs: typeof tabs, selected: string): boolean => {
//   return _tabs.some((tab) => tab.id === selected || findIsChildrenSelected(tab.children || [], selected));
// };

// 渲染 tabs，生成侧边栏，如果有子 tab，则递归渲染，type 为 button 的 tab 生成 ListItemButton，type 为 dropdown 的 tab 生成 List 和 ListItemButton，type 为 text 的 tab 生成 ListItemText
const renderTbas = (
  _tabs: typeof tabs,
  level: number,
  selected: string,
  setSelected: React.Dispatch<React.SetStateAction<string>>,
  openMap: { [key: string]: boolean },
  setOpen: ReturnType<typeof useMeta<{ [key: string]: boolean }>>[1],
  nav: NavigateFunction
) => {
  return _tabs.map((tab) => {
    if (tab.type === "button") {
      return (
        <ListItem
          key={tab.id}
          onClick={() => {
            setSelected(tab.id);
            nav(`/notes/${tab.path}`);
          }}
          disablePadding
        >
          <ListItemButton
            sx={{
              pl: level * 4,
              height: "2rem",
              color: tab.id === selected ? colors.blue[700] : void 0,
              borderRadius: "5px",
            }}
            onClick={(E) => E.preventDefault()}
            href={`/cs2-notebook/notes/${tab.path}`}
            selected={tab.id === selected}
          >
            {tab.title}
          </ListItemButton>
        </ListItem>
      );
    } else if (tab.type === "dropdown") {
      return (
        <>
          <ListItem
            key={tab.id}
            onClick={() => {
              // setSelected(tab.id); 目录不需要选中状态
              setOpen(tab.id, (open) => !open);
            }}
            disablePadding
          >
            <ListItemButton sx={{ pl: level * 4, height: "2rem", borderRadius: "5px" }}>
              {openMap[tab.id] ? (
                <ExpandMore
                  sx={{
                    fill: colors.blue["700"],
                    mr: "0.2rem",
                  }}
                  fontSize="small"
                />
              ) : (
                <ExpandMore
                  sx={{
                    fill: colors.blue["400"],
                    transform: "rotate(-90deg)",
                    mr: "0.2rem",
                  }}
                  fontSize="small"
                />
              )}
              <ListItemText>{tab.title}</ListItemText>
            </ListItemButton>
          </ListItem>
          <List component="div" disablePadding>
            <Collapse in={openMap[tab.id]} timeout="auto" unmountOnExit>
              {renderTbas(tab.children || [], level + 1, selected, setSelected, openMap, setOpen, nav)}
            </Collapse>
          </List>
        </>
      );
    } else if (tab.type === "text") {
      return (
        <ListItem key={tab.id} disablePadding>
          <ListItemText sx={{ pl: level * 4, height: "2rem" }} primary={tab.title} />
        </ListItem>
      );
    }
    return null;
  });
};
const initilizeOpenMap = () => {
  const collectDropdowns = (_tabs: typeof tabs, result: { [key: string]: boolean }) => {
    _tabs.forEach((tab) => {
      if (tab.type === "dropdown") {
        result[tab.id] = false;
        if (tab.children) {
          collectDropdowns(tab.children, result);
        }
      }
    });
  };

  const result: { [key: string]: boolean } = {};
  collectDropdowns(tabs, result);
  return result;
};
const initOpenMap = initilizeOpenMap();
const Sidebar: React.FC = () => {
  const [selected, setSelected] = React.useState("");
  const [open, setOpen] = useMeta(initOpenMap);
  const nav = useNavigate();
  const url = useLocation();

  useEffect(() => {
    // 根据路由获取当前选中的 tab，并设置 selected，同时递归遍历 tabs，展开所有父级 tab（如果有的话）
    const path = decodeURIComponent(url.pathname.replace(/^.*\/notes\//, ""));
    const findSelectedTab = (_tabs: typeof tabs, path: string): string | null => {
      for (const tab of _tabs) {
        if (tab.path === path) {
          sleep(200, () => setOpen(tab.id, true)); // 等等再展开，避免闪烁，用户体验更好
          return tab.id;
        }
        if (tab.children) {
          const childSelected = findSelectedTab(tab.children, path);
          if (childSelected) {
            // setOpen(tab.id, true);
            sleep(200, () => setOpen(tab.id, true)); // 等等再展开，避免闪烁，用户体验更好
            return childSelected;
          }
        }
      }
      return null;
    };

    const selectedTabId = findSelectedTab(tabs, path);
    if (selectedTabId) {
      setSelected(selectedTabId);
    }
  }, [url.pathname, setOpen]);

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

  useProvide("showLeftSideBar", show, {
    namespace: "docs",
    setState: setShow,
  });

  useProvide("selectedTabId", selected, {
    namespace: "docs",
    setState: setSelected,
  });

  const bodyElemRef = useClickAway(() => {
    if (!isWidthEnough) {
      setShow(false);
    }
  });

  return (
    <List
      className="doc-tab-list not-print"
      component={"nav"}
      ref={bodyElemRef}
      sx={{
        pr: "1rem",
        width: "280px",
        borderRight: "1px solid #e8eaee",
        height: "calc(var(--content-height) - 8px)", // 8px 大概是由于 header 的边框及 padding 造成的偏差
        position: "fixed",
        left: show ? "1rem" : "-320px", // "1rem" 为左侧边距，与右侧栏的右边距保持一致
        background: "#fff",
        transition: "left 0.3s ease-in-out",
        overflowY: "auto",
      }}
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>CS2 Notebook</span>
          <ExitToAppOutlined
            sx={{
              rotate: "180deg",
              color: colors.grey[500],
              transform: "translateX(-16px)",
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
        </ListSubheader>
      }
    >
      {renderTbas(tabs, 0, selected, setSelected, open, setOpen, nav)}
      <Blank />
    </List>
  );
};

export default Sidebar;
