import axios from "axios";
import { useEffect, useState } from "react";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";

export default function DetailProductComponent() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  const { id } = useParams();

  async function fetchProduct() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/tokoku-tugas-lab/product/get-product/${id}`,
      );
      console.log(response.data);
      setProduct(response.data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  async function deleteProduct(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/tokoku-tugas-lab/product/delete-product/${id}`,
      );

      console.log(response);
      navigate("..");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className=" font-nunito flex flex-col gap-5">
      <div className=" flex gap-5 mt-[50px]">
        <Link to={"../"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
        <h1 className=" text-xl font-bold">Detail Product</h1>
      </div>
      <div>
        {product.map((item) => {
          return (
            <div className=" flex gap-5">
              <img
                className=" w-[300px] h-full object-cover"
                src={item.image}
                alt={item.productName}
                srcset=""
              />
              <div className=" flex flex-col justify-between gap-2">
                <div>
                  <p className=" text-lg font-bold">{item.productName}</p>
                  <p>{item.description}</p>
                  <p className=" font-bold">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(item.price)}
                  </p>
                </div>
                <div className=" flex gap-2">
                  <Link
                    to={`/update-product/${item._id}`}
                    className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(item._id)}
                    className=" bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
