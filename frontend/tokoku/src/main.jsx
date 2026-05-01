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
        path: "login",
        element: <LoginComponent />,
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
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
