import { NavLink } from "react-router-dom";

export default function NavigationComponent() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-500";

  return (
    <div className="flex h-[75px] items-center justify-between sticky top-0 px-6">
      <h1 className="text-3xl font-bold">Tokoku</h1>

      <div className="h-full flex items-center relative">
        <div className="absolute left-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <input
          className="bg-slate-50 w-[400px] h-[35px] rounded-2xl pl-[65px] focus:outline-none"
          type="text"
          placeholder="cari produk"
        />
      </div>

      <div className="flex gap-5">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>

        <NavLink to="/products" className={linkClass}>
          Product
        </NavLink>

        <NavLink to="/create-product" className={linkClass}>
          Create Product
        </NavLink>

        {/* <NavLink to="/login" className={linkClass}>
          Login
        </NavLink> */}
      </div>
    </div>
  );
}
