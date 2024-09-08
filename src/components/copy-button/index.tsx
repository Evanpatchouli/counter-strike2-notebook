import { ContentCopyRounded } from "@mui/icons-material";
import msg from "../../hooks/msg";

const copyToClipboard = (
  text: string,
  options: {
    onSuccess: () => void;
    onFailure: () => void;
  }
) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        options.onSuccess();
      })
      .catch((err) => {
        options.onFailure();
      });
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // 避免在页面滚动时影响用户体验
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      const successful = document.execCommand("copy");
      const msg = successful ? "successful" : "unsuccessful";
      if (msg === "successful") {
        options.onSuccess();
      } else {
        options.onFailure();
      }
    } catch (err) {
      options.onFailure();
    }
    document.body.removeChild(textArea);
  }
  return true;
};

export default function CopyButton(props: { code: string }) {
  return (
    <ContentCopyRounded
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 100,
        cursor: "pointer",
        color: "gainsboro",
        transform: "translate(-60%, 80%) rotateX(180deg)",
        "&:hover": {
          color: "primary.main",
        },
      }}
      onClick={() => {
        copyToClipboard(props.code, {
          onSuccess: () => msg.success("复制成功"),
          onFailure: () => msg.error("复制失败，请手动复制"),
        });
      }}
    />
  );
}
