import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateProductComponent() {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const createProduct = async (formData) => {
    return axios.post(
      "https://tugas-lab-specialized-platform.onrender.com/api/v1/tokoku-tugas-lab/product/create-product",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);

      await createProduct(formData);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Gagal membuat produk!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">Tambah Produk</h1>
        <p className="text-center text-gray-500 mb-6">
          Isi detail produk yang ingin kamu jual
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nama Produk"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="bg-slate-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            placeholder="Harga (Rp)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-slate-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            placeholder="Deskripsi Produk"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="bg-slate-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="bg-slate-100 p-3 rounded-lg">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Produk"}
          </button>
        </form>
      </div>
    </div>
  );
}
