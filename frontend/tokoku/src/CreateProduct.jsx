import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateProductComponent() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const createProduct = async (formData) => {
    try {
      const response = await axios.post(
        "https://tugas-lab-specialized-platform.onrender.com/api/v1/tokoku-tugas-lab/product/create-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("Product created successfully:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    createProduct(formData);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="w-[500px] bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Buat Produk</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nama Produk"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className=" bg-slate-50 p-2 rounded-lg focus:outline-none"
          />

          <input
            type="number"
            placeholder="Harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className=" bg-slate-50 p-2 rounded-lg focus:outline-none"
          />

          <textarea
            placeholder="Deskripsi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className=" bg-slate-50 p-2 rounded-lg focus:outline-none"
          />

          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <button
            type="submit"
            className=" bg-slate-300 p-2 rounded-lg focus:outline-none"
          >
            Simpan Produk
          </button>
        </form>
      </div>
    </div>
  );
}
