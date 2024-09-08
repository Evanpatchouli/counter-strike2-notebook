import { useClickAway, useMixRef } from "@evanpatchouli/react-hooks-kit";
import { Backdrop, Tooltip } from "@mui/material";
import classNames from "classnames";
import { useState, useRef, useEffect } from "react";
import "./index.css";

export type ImgProps = {
  enablePreview?: boolean;
  className?: string;
  onDoubleClick?: React.MouseEventHandler<HTMLImageElement>;
} & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const ImgPlus = ({ enablePreview = true, onDoubleClick, className, ...props }: ImgProps) => {
  const [preview, setPreview] = useState(false);
  const [h, setH] = useState(90);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });
  const imgDomRef = useRef<HTMLImageElement>(null);

  const clickAwayRef = useClickAway(() => {
    handleClose();
  });

  const imgRef = useMixRef<HTMLImageElement>([imgDomRef, clickAwayRef]);

  const $onDoubleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    console.log("双击预览");
    setPreview(true);
    onDoubleClick?.(e);
  };

  const handleClose = () => {
    setPreview(false);
    setH(90);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    setH((prev) => prev + (e.deltaY > 0 ? -5 : 5));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    if (imgDomRef.current && h > 100) {
      setIsDragging(true);
      startPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (isDragging) {
      setPosition({ x: e.clientX - startPos.current.x, y: e.clientY - startPos.current.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (h <= 100) {
      setPosition({ x: 0, y: 0 });
    }
  }, [h]);

  return (
    <>
      <Tooltip title={"双击预览"} placement="bottom-end">
        <img
          className={classNames([enablePreview ? "img-plus" : "", className]) || void 0}
          {...props}
          onDoubleClick={$onDoubleClick}
        />
      </Tooltip>
      <Backdrop
        open={preview}
        sx={{
          zIndex: 9999,
        }}
        onWheel={handleWheel}
      >
        <div
          style={{
            overflow: "hidden",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            ref={imgRef}
            src={props.src}
            alt={props.alt}
            title={props.title}
            aria-label={props["aria-label"]}
            height={`${h}%`}
            style={{
              cursor: h > 100 ? "grabbing" : "default",
              transform: `translate(${position.x}px, ${position.y}px)`,
              transition: isDragging ? "none" : "transform 0.2s ease-in-out",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>
      </Backdrop>
    </>
  );
};

export default function Img({ enablePreview = true, onDoubleClick, className, ...props }: ImgProps) {
  if (!enablePreview) {
    return <img className={className} {...props} onDoubleClick={onDoubleClick} />;
  }
  return <ImgPlus className={className} {...props} onDoubleClick={onDoubleClick} />;
}
