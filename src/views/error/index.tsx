/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useRouteError } from "react-router-dom";
import useDevEffect from "../../hooks/useDevEffect";
import "./index.css";
import { AppErrorID, AppError } from "./app-error";
import DocNotFound from "./doc-not-found";
import Default from "./default";

const ErrorHandlerMap: {
  [key: AppErrorID]: (props: { error: AppError }) => React.ReactNode;
} = {
  "doc-404": DocNotFound,
  // Add more error types as needed
  // ["custom-error-id"]: () => <h1>Custom error message</h1>,
};

export default function ErrorPage() {
  const error = useRouteError() as AppError;
  const nav = useNavigate();
  useDevEffect(() => {
    console.error(error);
    console.log(error.statusText);
    console.log(error.name);
    console.log(error.id);
    if (error.stack) {
      console.log(error.stack);
    }
  }, [error]);

  return (
    <div className="error-page">
      {ErrorHandlerMap[error.id as AppErrorID] ? (
        ErrorHandlerMap[error.id as AppErrorID]({ error })
      ) : (
        <Default error={error} />
      )}

      <p>
        <a
          onClick={(e) => {
            e.preventDefault();
            nav("/notes");
          }}
          href="/cs2-notebook/notes"
        >
          回到手册首页
        </a>
      </p>

      {/* <pre>{process.env.NODE_ENV === 'development' && error.stack && <code>{error.stack}</code>}</pre> */}

      {/* <p>If the issue persists, please contact the support team.</p> */}
      <p>如果问题仍然存在，请联系支持团队</p>

      <p>
        <a href="https://github.com/counter-strike2/counter-strike2-notebook/issues/new" target="_blank">
          报告问题
          {/* Report an issue */}
        </a>
      </p>

      <p>
        <a href="https://github.com/counter-strike2/counter-strike2-notebook/blob/main/CONTRIBUTING.md" target="_blank">
          为项目尽一份绵薄之力
          {/* Contribute to the project */}
        </a>
      </p>
    </div>
  );
}
