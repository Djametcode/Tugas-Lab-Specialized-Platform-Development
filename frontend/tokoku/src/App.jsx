import NavigationComponent from "./components/Navigation";
import "./App.css";
import ProductComponent from "./components/Product";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import LoginComponent from "./components/auth/Login";
import { useEffect } from "react";

export default function App() {
  const token = localStorage.getItem("token");

  function usePageTracking() {
    const location = useLocation();

    useEffect(() => {
      window.gtag("config", "G-LMVK1QSGMS", {
        page_path: location.pathname,
      });
    }, [location]);
  }

  usePageTracking();
  return (
    <div className=" h-screen pl-[300px] pr-[300px]">
      <NavigationComponent />
      {token ? <Outlet /> : <Navigate to="/auth/login" replace />}
    </div>
  );
}
