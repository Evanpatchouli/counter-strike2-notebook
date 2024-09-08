/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Typography, useMediaQuery } from "@mui/material";
import "./index.css";
import { useNavigate } from "react-router";
import FrostedCard, { FrostedCardProps } from "../../components/frosted-card";
import useResize from "../../hooks/useResize";

export default function Home() {
  const nav = useNavigate();
  const jumpToDoc = (path: string) => {
    nav(`/notes${path}`);
  };

  const cardProps = (PATH: string) =>
    ({
      opacity: 0.6,
      h: "240px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      placement: "center",
      justifyContent: "center",
      m: "1em",
      px: "1em",
      className: "nav-card",
      style: {
        cursor: "pointer",
        boxSizing: "border-box",
      },
      onClick: () => jumpToDoc(PATH),
    } as Partial<FrostedCardProps>);

  const size = useResize();

  const gridColumns = (() => {
    if (size.width >= 1080) return 4;
    if (size.width >= 600) return 2;
    return 1;
  })();

  const navCardWidth = (() => {
    if (size.width >= 425) return "calc((100% - 2em * var(--Grid-columns) - 0.6em * 2) / var(--Grid-columns))";
    return "calc(100% - 2em)";
  })();

  const titleSize = (() => {
    if (size.width >= 1600) return "6em";
    if (size.width >= 1420) return `${6 - (2 * (1600 - size.width)) / (1600 - 1420)}em`;
    return "4em";
  })();

  const titlePosition = size.width >= 1420 ? "left" : "top";

  return (
    <div
      className="homepage"
      style={{
        flexDirection: titlePosition === "left" ? "row" : "column",
        justifyContent: titlePosition === "left" ? "center" : "start",
        padding: size.width > 360 ? "1em" : "0",
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        className="homepage-title"
        style={{
          fontSize: titleSize,
          textAlign: titlePosition === "left" ? "left" : "center",
        }}
      >
        <div style={{ fontSize: "70%", textWrap: "nowrap" }}>Counter-Strike 2</div>
        <div>笔记本✨</div>
      </Typography>
      <div
        className="cards-box"
        style={{
          // @ts-ignore
          "--Grid-columns": gridColumns,
          "--nav-card-width": navCardWidth,
        }}
      >
        {/** 不再将皮肤图鉴放到首页，匡正CNCS风气 */}
        <FrostedCard {...cardProps("/新闻速递")}>
          <header>新闻速递</header>
          <p>战地记者带你看最新资讯</p>
        </FrostedCard>
        <FrostedCard {...cardProps("/道具手册/道具介绍")}>
          <header>道具手册</header>
          <p>学习新道具，做爆丸小子</p>
        </FrostedCard>
        <FrostedCard {...cardProps("/战术手册/战术介绍")}>
          <header>战术手册</header>
          <p>心有战术，纵横捭阖</p>
        </FrostedCard>
        <FrostedCard {...cardProps("/职业赛事")}>
          <header>职业赛事</header>
          <p>最新赛事动态与数据分析</p>
        </FrostedCard>
        <FrostedCard {...cardProps("/职业选手")}>
          <header>职业选手</header>
          <p>随职业选手，感电竞魅力</p>
        </FrostedCard>
        <FrostedCard {...cardProps("/指令大全")}>
          <header>指令大全</header>
          <p>你的 CS2 指令备忘录</p>
        </FrostedCard>
        <FrostedCard {...cardProps("/游戏设置")}>
          <header>游戏设置</header>
          <p>你可能需要的设置更优解</p>
        </FrostedCard>
        <FrostedCard {...cardProps("/创意工坊")}>
          <header>创意工坊</header>
          <p>经典模式腻了？来工坊！</p>
        </FrostedCard>
      </div>
    </div>
  );
}
