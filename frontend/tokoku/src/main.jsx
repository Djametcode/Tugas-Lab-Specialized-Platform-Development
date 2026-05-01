import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateProductComponent from "./CreateProduct.jsx";
import NavigationComponent from "./components/Navigation.jsx";
import ProductComponent from "./components/Product.jsx";
import Hero from "./components/Hero.jsx";
import DetailProductComponent from "./DetailProduct.jsx";
import UpdateProductComponent from "./EditProduct.jsx";
import LoginComponent from "./components/auth/Login.jsx";
import WrapperComponent from "./components/auth/Wrapper.jsx";
import RegisterComponent from "./components/auth/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Hero />,
      },
      {
        path: "create-product",
        element: <CreateProductComponent />,
      },
      {
        path: "products",
        element: <ProductComponent />,
      },
      {
        path: "detail-product/:id",
        element: <DetailProductComponent />,
      },
      {
        path: "update-product/:id",
        element: <UpdateProductComponent />,
      },
    ],
  },
  {
    path: "/auth",
    element: <WrapperComponent />,
    children: [
      {
        path: "login",
        element: <LoginComponent />,
      },
      {
        path: "register",
        element: <RegisterComponent />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
