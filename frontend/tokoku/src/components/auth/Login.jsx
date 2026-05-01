import axios from "axios";
import { useState } from "react";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const data = {
    email: email,
    password: password,
  };

  console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://tugas-lab-specialized-platform.onrender.com/api/v1/tokoku-tugas-lab/auth/login",
        data,
      );

      const result = await response.data;

      localStorage.setItem("token", result.token);

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="w-[500px] h-[400px] bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" bg-slate-50 p-2 rounded-lg focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" bg-slate-50 p-2 rounded-lg focus:outline-none"
          />

          <button
            type="submit"
            className=" bg-blue-500 p-2 rounded-lg focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
