import { Button } from "@mui/material";
import { flattenTabs, Tab } from "../../components/sidebar/tabs";
import { useLocation, useNavigate } from "react-router";
import { useInject } from "@evanpatchouli/react-hooks-kit";

const tabsFlatten = flattenTabs();
const ignoreTabTypes = ["dropdown"];

export default function DocActions() {
  const nav = useNavigate();
  const url = useLocation();
  const [selectedTabId, setSelectedTabId] = useInject("selectedTabId", {
    namespace: "docs",
  });
  const docTo = (tab: Tab) => {
    nav(`/notes/${tab.path}`);
    setSelectedTabId(tab.id);
  };

  const selectedTabIndex = tabsFlatten.findIndex((tab) => tab.id === selectedTabId);
  const selectedTab = tabsFlatten[selectedTabIndex];
  const currentDocPaht = decodeURIComponent(url.pathname.replace(/^.*\/notes\//, ""));
  const isCurrentDocInTabs = currentDocPaht === selectedTab?.path;

  if (!isCurrentDocInTabs) {
    return null;
  }

  const previousTab =
    selectedTabIndex > 0
      ? tabsFlatten
          .slice(0, selectedTabIndex)
          .reverse()
          .find((tab) => !ignoreTabTypes.includes(tab.type))
      : null;

  const nextTab =
    selectedTabIndex < tabsFlatten.length - 1
      ? tabsFlatten.slice(selectedTabIndex + 1).find((tab) => !ignoreTabTypes.includes(tab.type))
      : null;

  return (
    <div className="doc-actions">
      <Button
        variant="outlined"
        color="primary"
        size="medium"
        onClick={() => previousTab?.path && docTo(previousTab)}
        disabled={!previousTab}
      >
        上一篇 {previousTab?.title}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        size="medium"
        onClick={() => nextTab?.path && docTo(nextTab)}
        disabled={!nextTab}
      >
        下一篇 {nextTab?.title}
      </Button>
    </div>
  );
}
