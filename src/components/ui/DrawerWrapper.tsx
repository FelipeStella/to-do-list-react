import { forwardRef, useImperativeHandle, useState } from "react";
import { Drawer } from "@mui/material";

export type DrawerWrapperRef = {
  openDrawer: () => void;
};

const DrawerWrapper = forwardRef<
  DrawerWrapperRef,
  { children?: React.ReactNode }
>(({ children }, ref) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  useImperativeHandle(ref, () => ({
    openDrawer: () => {
      setOpen(true);
    },
  }));

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{ color: "#ffffff" }}>
      {children}
    </Drawer>
  );
});

DrawerWrapper.displayName = "DrawerWrapper";

export default DrawerWrapper;
