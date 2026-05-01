import NavigationComponent from "./components/Navigation";
import "./App.css";
import ProductComponent from "./components/Product";
import { Link, Outlet } from "react-router-dom";
import LoginComponent from "./components/auth/Login";

export default function App() {
  const token = localStorage.getItem("token");
  return (
    <div className=" h-screen pl-[300px] pr-[300px]">
      <NavigationComponent />
      {token ? <Outlet /> : <LoginComponent />}
    </div>
  );
}
