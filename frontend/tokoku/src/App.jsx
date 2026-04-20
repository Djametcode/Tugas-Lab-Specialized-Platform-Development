import NavigationComponent from "./components/Navigation";
import "./App.css";
import ProductComponent from "./components/Product";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className=" h-screen pl-[300px] pr-[300px]">
      <NavigationComponent />
      <Outlet />
    </div>
  );
}
