// src/App.jsx
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./components/layout/Layout";
import ToastProvider from "./components/layout/ToastProvider";
import { routes } from "./constants/routes";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const renderRoutes = (routesConfig) =>
    routesConfig.map((route, index) => {
      const { protected: isProtected, children, ...rest } = route;
      const routeElement = isProtected ? (
        <ProtectedRoute>{rest.element}</ProtectedRoute>
      ) : (
        rest.element
      );

      if (children) {
        return (
          <Route key={index} {...rest} element={routeElement}>
            {renderRoutes(children)}
          </Route>
        );
      }

      return <Route key={index} {...rest} element={routeElement} />;
    });

  return (
    <Layout>
      <ToastProvider>
        <Routes>{renderRoutes(routes(isAuthenticated))}</Routes>
      </ToastProvider>
    </Layout>
  );
}

export default App;