import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "./Product.css";
import { Link } from "react-router-dom";

export default function ProductComponent() {
  async function fetchProducts() {
    try {
      const response = await axios.get(
        "http://tugas-lab-specialized-platform.onrender.com/api/v1/tokoku-tugas-lab/product/get-all-products",
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className=" flex justify-start mt-[50px]">
      <div className=" flex flex-wrap gap-5">
        {products.map((item) => {
          return (
            <Link
              to={`/detail-product/${item._id}`}
              className=" w-[200px] h-[295px] rounded-2xl relative shadow hover:shadow-lg"
            >
              <div className=" w-full h-[200px]">
                <img
                  className=" h-full w- object-contain rounded-tr-2xl rounded-tl-2xl"
                  src={item.image}
                  alt={item.productName}
                  srcset=""
                />
              </div>
              <div className=" p-[15px]">
                <p className=" text-[13px]">{item.productName}</p>
                <p className=" text-[15px] font-bold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(item.price)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
