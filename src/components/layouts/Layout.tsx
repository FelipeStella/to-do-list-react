import React from "react";
import UIComponents from "src/ui-components";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <UIComponents.RetroHeader />
      <main>{children}</main>
      <footer>{/* footer */}</footer>
    </div>
  );
};

export default Layout;
