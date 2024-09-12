import { useTheme } from "@evanpatchouli/react-hooks-kit";

export default function About() {
  const theme = useTheme();
  return (
    <>
      <h1>关于 CS2 笔记本</h1>
      {theme}
    </>
  );
}
