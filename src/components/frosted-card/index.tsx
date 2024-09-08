import classNames from "classnames";
import "./index.css";
import { CSSProperties } from "react";

export type FrostedCardProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  blur?: number;
  opacity?: number;
  // 以为 % 结尾的数字，如 "180%"
  saturation?: `${number}%`;
  w?: CSSProperties["width"];
  h?: CSSProperties["height"];
  p?: CSSProperties["padding"];
  m?: CSSProperties["margin"];
  pl?: CSSProperties["paddingLeft"];
  pr?: CSSProperties["paddingRight"];
  pt?: CSSProperties["paddingTop"];
  pb?: CSSProperties["paddingBottom"];
  px?: CSSProperties["paddingInline"];
  py?: CSSProperties["paddingBlock"];
  ml?: CSSProperties["marginLeft"];
  mr?: CSSProperties["marginRight"];
  mt?: CSSProperties["marginTop"];
  mb?: CSSProperties["marginBottom"];
  mx?: CSSProperties["marginInlineStart"];
  my?: CSSProperties["marginInlineEnd"];
  r?: CSSProperties["borderRadius"];
  placement?: CSSProperties["placeItems"];
  display?: CSSProperties["display"];
  textAlign?: CSSProperties["textAlign"];
  color?: CSSProperties["color"];
  flexDirection?: CSSProperties["flexDirection"];
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  gap?: CSSProperties["gap"];
  fs?: CSSProperties["fontSize"];
};

export default function FrostedCard({
  className,
  blur = 16,
  opacity = 0.75,
  saturation = "180%",
  style,
  w,
  h,
  p,
  m,
  pl,
  pr,
  pt,
  pb,
  px,
  py,
  ml,
  mr,
  mt,
  mb,
  mx,
  my,
  r = "12px",
  placement,
  display,
  textAlign,
  color,
  flexDirection,
  justifyContent,
  fs,
  ...rest
}: FrostedCardProps) {
  const styleProps = {
    placeItems: placement,
    width: w,
    height: h,
    padding: p,
    margin: m,
    paddingLeft: pl,
    paddingRight: pr,
    paddingTop: pt,
    paddingBottom: pb,
    paddingInline: px,
    paddingBlock: py,
    marginLeft: ml,
    marginRight: mr,
    marginTop: mt,
    marginBottom: mb,
    marginInline: mx,
    marginBlock: my,
    display: display,
    textAlign: textAlign,
    color: color,
    flexDirection: flexDirection,
    justifyContent: justifyContent,
    fontSize: fs,
  };

  const cleanedStyleProps = Object.fromEntries(Object.entries(styleProps).filter(([_, value]) => value !== undefined));
  return (
    <div
      className={classNames(["frosted-card", className])}
      style={{
        // @ts-expect-error 透传 css 变量
        "--blur": `${blur}px`,
        "--opacity": opacity,
        "--saturation": saturation,
        "--radius": r,
        ...cleanedStyleProps,
        ...style,
      }}
      {...rest}
    ></div>
  );
}
