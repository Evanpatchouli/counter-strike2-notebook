import { Box, Stack, Tooltip } from "@mui/material";
import Translate from "@mui/icons-material/Translate";
import DeveloperDocIcon from "@mui/icons-material/BookOutlined";
import logo from "/icon.svg";
import "./index.css";
import msg from "../../hooks/msg";
import { useNavigate } from "react-router";

export default function Header() {
  const nav = useNavigate();
  return (
    <Box display="flex" justifyContent={"space-between"} width="100%">
      <Stack direction="row" spacing={2} pl={"1rem"} component={"a"} href="/cs2-notebook/">
        {/* <span
          style={{
            position: "absolute",
            top: "-30px",
            height: "4rem",
            lineHeight: "4rem",
            width: "100%",
            textAlign: "center",
          }}
        >
          别拉啦，真的没有东西
        </span> */}
        <Box alignItems="center" display="flex">
          <img className="header-logo" alt="cs2 logo" aria-label="cs2 logo" src={logo} />
        </Box>
        <Box alignItems="center" display="flex">
          <header className="header-title">CS2 笔记本</header>
        </Box>
      </Stack>

      <Box alignItems="center" display="flex" gap={2} pr={4}>
        <Tooltip
          title="翻译"
          onClick={() => {
            msg.info("尚未支持");
          }}
        >
          <Translate sx={{ cursor: "pointer" }} />
        </Tooltip>
        <Tooltip
          title="开发者日志"
          onClick={() => {
            nav('/notes/开发者日志')
          }}
        >
          <DeveloperDocIcon sx={{ cursor: "pointer" }} />
        </Tooltip>
      </Box>
    </Box>
  );
}
