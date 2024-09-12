import { useTheme as useColorSchema } from "@evanpatchouli/react-hooks-kit";
import { useMemo } from "react";

const themeMap = {
  "light": {
    borderColor: "#e8eaee",
  },
  "dark": {
    borderColor: "#2e3440",
  }
} as const;

export default function useTheme() {
  const browserTheme = useColorSchema();
  const theme = useMemo(() => {
    return themeMap[browserTheme] || themeMap["light"];
  }, [browserTheme]);
  return theme;
}