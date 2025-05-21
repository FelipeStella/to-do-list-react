import { Box } from "@mui/material";
import React, { useState } from "react";
import UIComponents from "src/ui-components";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [handlerOnAddTask, setHandlerOnAddTask] = useState<
    (() => void) | undefined
  >(undefined);

  return (
    <UIComponents.RetroHeaderContext.Provider
      value={{ handlerOnAddTask, setHandlerOnAddTask }}>
      <Box display="flex" flexDirection="column" height="100vh">
        <UIComponents.RetroHeader />
        <Box flexGrow={1}>
          <main style={{ flexGrow: 1, display: "flex", height: "100%" }}>
            {children}
          </main>
        </Box>
      </Box>
    </UIComponents.RetroHeaderContext.Provider>
  );
};

export default Layout;
