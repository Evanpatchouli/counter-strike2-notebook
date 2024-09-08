export default function Blank(props: { h?: string; w?: string }) {
  return (
    <div
      style={{
        height: props.h || "1rem",
        width: props.w || "1rem",
      }}
    ></div>
  );
}
