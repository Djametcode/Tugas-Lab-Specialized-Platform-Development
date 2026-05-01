import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Hero() {
  async function fetchProducts() {
    try {
      const response = await axios.get(
        "https://tugas-lab-specialized-platform.onrender.com/api/v1/tokoku-tugas-lab/product/get-all-products",
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
    <div className=" min-h-screen font-nunito mt-[100px] flex flex-col gap-5">
      <h1 className=" text-3xl font-bold">Selamat datang di TOKOKU</h1>
      <div className=" w-[500px] text-lg text-justify">
        <p>
          Nikmati pengalaman belanja yang lebih hemat dan menyenangkan dengan
          berbagai promo menarik setiap hari. Dapatkan diskon spesial untuk
          berbagai produk pilihan, sehingga kamu bisa berbelanja lebih puas
          tanpa perlu khawatir soal harga. Selain itu, nikmati juga keuntungan
          gratis ongkir ke berbagai daerah, membuat belanja online jadi semakin
          praktis dan terjangkau.
        </p>
      </div>
      <div className=" bg-amber-500 w-[150px] flex items-center justify-center p-2 rounded font-bold text-white rounded-xl">
        <button>Belanja Sekarang</button>
      </div>
      <div className=" mt-[100px]">
        <h2 className=" font-bold">Produk Unggulan</h2>
      </div>
      <div className=" flex flex-wrap gap-5">
        {products.map((item) => {
          return (
            <Link
              to={`detail-product/${item._id}`}
              className=" w-[200px] h-[295px] rounded-2xl relative shadow hover:shadow-lg"
            >
              <div className=" w-full h-[200px] bg-slate-300 rounded-2xl">
                <img
                  className=" h-full w- object-cover"
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
