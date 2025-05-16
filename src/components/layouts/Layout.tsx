import { Box } from "@mui/material";
import React from "react";
import UIComponents from "src/ui-components";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <UIComponents.RetroHeader />
      <Box flexGrow={1}>
        <main style={{ flexGrow: 1, display: "flex", height: "100%" }}>
          {children}
        </main>
      </Box>
    </Box>
  );
};

export default Layout;
