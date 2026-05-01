import { Outlet } from "react-router-dom";
import NavigationComponent from "../Navigation";

export default function WrapperComponent() {
  return (
    <div className=" pl-[300px] pr-[300px]">
      <NavigationComponent />
      <Outlet />
    </div>
  );
}
