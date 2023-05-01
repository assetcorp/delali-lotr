import React, { ReactElement, useContext, useEffect, useState } from "react";
import useResizeObserver from "@react-hook/resize-observer";
import Box from "@mui/material/Box";
import { AppContext } from "../providers/app.provider";

interface Size {
  width: number;
  height: number;
}

interface IAppProps {
  children?: ReactElement | ReactElement[];
}

const App = ({ children }: IAppProps) => {
  const { setAppMargin } = useContext(AppContext);

  const [appHeight, setAppHeight] = useState("100vh");
  const target = React.useRef(document.getElementById("app-header"));
  const targetInner = React.useRef(document.getElementById("app-header-inner"));
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });
  const [sizeInner, setSizeInner] = useState<Size>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    target.current = document.getElementById("app-header");
    targetInner.current = document.getElementById("app-header-inner");
  }, [target, targetInner]);

  useEffect(() => {
    if (sizeInner) {
      setAppMargin(sizeInner.height);
    }
  }, [sizeInner]);

  React.useLayoutEffect(() => {
    if (target.current) {
      const targetSize = target.current.getBoundingClientRect();
      setSize(targetSize);
    }
    if (targetInner.current) {
      const targetSize = targetInner.current.getBoundingClientRect();
      setSizeInner(targetSize);
      setAppMargin(targetSize.height);
    }
  }, [target.current, targetInner.current]);

  useResizeObserver(document.getElementById("app-header"), (entry) => {
    const { width, height } = entry.contentRect;
    setSize({ width, height });
  });
  useResizeObserver(document.getElementById("app-header-inner"), (entry) => {
    const { width, height } = entry.contentRect;
    setSizeInner({ width, height });
    setAppMargin(height);
  });

  // Calculating application height
  React.useEffect(() => {
    setAppHeight(`calc(100vh - ${size.height}px)`);
  }, [size]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: appHeight,
        marginTop: `${size.height}px`,
      }}
    >
      {children}
    </Box>
  );
};

export default App;
