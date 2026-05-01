import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProductComponent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // FETCH DATA AWAL (EDIT MODE)
  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    try {
      const response = await axios.get(
        `http://tugas-lab-specialized-platform.onrender.com/api/v1/tokoku-tugas-lab/product/get-product/${id}`,
      );

      console.log(response.data);

      const product = response.data.product?.[0] || response.data;

      setProductName(product.productName || "");
      setPrice(product.price || "");
      setDescription(product.description || "");
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  // UPDATE PRODUCT
  const editProduct = async (formData) => {
    try {
      const response = await axios.put(
        `http://tugas-lab-specialized-platform.onrender.com/api/v1/tokoku-tugas-lab/product/update-product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("Product updated successfully:", response.data);

      // redirect setelah sukses
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    editProduct(formData);
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="w-[500px] bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Edit Produk</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nama Produk"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="bg-slate-50 p-2 rounded-lg focus:outline-none"
          />

          <input
            type="number"
            placeholder="Harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-slate-50 p-2 rounded-lg focus:outline-none"
          />

          <textarea
            placeholder="Deskripsi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-slate-50 p-2 rounded-lg focus:outline-none"
          />

          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Update Produk
          </button>
        </form>
      </div>
    </div>
  );
}
