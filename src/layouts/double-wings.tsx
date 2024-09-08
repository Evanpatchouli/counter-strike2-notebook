import "./double-wings.css";

const DoubleWings = (props: {
  header?: React.ReactNode;
  children: React.ReactNode[] & {
    length: 3;
  };
  footer?: React.ReactNode;
  contentStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
}) => (
  <div className="layout-double-wings">
    {props.header && (
      <header className="layout-double-wings__header" id="layout-double-wings__header" style={props.headerStyle}>
        {props.header}
      </header>
    )}
    <div className="layout-double-wings-body" id="layout-double-wings-body">
      <div className="layout-double-wings-main" id="layout-double-wings-main">
        <aside className="layout-double-wings__sidebar" id="layout-double-wings__sidebar">
          {props.children[0]}
        </aside>
        <main className="layout-double-wings__content" id="layout-double-wings__content" style={props.contentStyle}>
          {props.children[1]}
        </main>
        <aside className="layout-double-wings__sidebar" id="layout-double-wings__sidebar">
          {props.children[2]}
        </aside>
      </div>
      {props.footer && (
        <footer className="layout-double-wings__footer" id="layout-double-wings__footer" style={props.footerStyle}>
          {props.footer}
        </footer>
      )}
    </div>
  </div>
);

export default DoubleWings;
