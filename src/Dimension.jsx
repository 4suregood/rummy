import * as React from "react";
// import "./styles.css";
import './App.css';
export default function Dimension() {
  const element = React.useRef(null);
  const [width, setWidth] = React.useState(0);

  const observer = React.useMemo(
    () =>
      new ResizeObserver((entries) => {
        setWidth(entries[0].target.getBoundingClientRect().width);
      }),
    []
  );

  const sizeRef = React.useCallback(
    (node) => {
      if (element !== null) {
        element.current = node;
        observer.observe(node);
      } else {
        observer.unobserve(element.current);
        element.current = null;
      }
    },
    [observer]
  );

  return (
    <div ref={sizeRef} className="dim">
      Width: {width}
    </div>
  );
}
