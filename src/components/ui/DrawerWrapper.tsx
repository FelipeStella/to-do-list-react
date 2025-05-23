import { forwardRef, useImperativeHandle, useState } from "react";
import { Drawer, Box } from "@mui/material";
import { styled } from "@mui/system";

export type DrawerWrapperRef = {
  openDrawer: () => void;
};

const StyledDrawer = styled(Drawer)({
  "& .MuiDrawer-paper": {
    backgroundColor: "#111",
    color: "#00ffcc",
    borderLeft: "2px dashed #ff0099",
    boxShadow: "0 0 12px #ff0099",
    fontFamily: "'Press Start 2P', cursive",
    padding: "2rem",
    width: "400px", // largura personalizada
    overflowY: "auto",
    backgroundImage: `radial-gradient(#222 1px, transparent 1px)`,
    backgroundSize: "16px 16px",
  },
});

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
    <StyledDrawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Box>{children}</Box>
    </StyledDrawer>
  );
});

DrawerWrapper.displayName = "DrawerWrapper";

export default DrawerWrapper;
