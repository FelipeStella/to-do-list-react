import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./gen/routes";
import UIComponents from "./ui-components";
import "./assets/styles/App.css";

function App() {
  const isLoggedIn = true;

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) =>
          isLoggedIn ? (
            <Route
              key={route.path}
              path={route.path}
              element={
                <UIComponents.Layout>{route.element}</UIComponents.Layout>
              }
            />
          ) : (
            <Route key={route.path} path={route.path} element={route.element} />
          )
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
