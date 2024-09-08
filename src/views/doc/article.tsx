import { useLoaderData } from "react-router";
import Md from "../../components/md";

export default function Article() {
  const atricle = useLoaderData() as {
    path: string;
    text: string;
  };
  return (
    <article className="cs2-notebook-article">
      <Md>{atricle?.text}</Md>
    </article>
  );
}
