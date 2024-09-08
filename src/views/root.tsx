/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useLocation } from "react-router";
import Home from "./home";

const Empty = () => <></>;

const renderMap = [
  {
    exp: RegExp(/^\/$/),
    render: () => <Home />,
  },
  {
    exp: RegExp(/^\/.+/),
    render: () => <Outlet />,
  },
];

const getRender = (pathname: string) => {
  const match = renderMap.find((item) => item.exp.test(pathname));
  return match?.render || Empty;
};

export default function Root() {
  const url = useLocation();
  const RenderComponent = getRender(url.pathname);
  return (
    <>
      <RenderComponent />
    </>
  );
}
