import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../Store/cartStore";

const fetchCategories = async () => {
  const res = await fetch(`https://fakestoreapi.com/products/categories`);
  if (!res.ok) throw new Error("failed to fetch categories");
  const data = await res.json();
  return data;
};

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const {
    data: categories,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between py-4 px-6 md:px-10 bg-white border-b-2 border-[#ced4da] gap-4">
      {/* Logo Section */}
      <div className="w-full md:w-auto flex justify-center md:justify-start">
        <Link to={"/"}>
          <h1
            className="text-2xl md:text-3xl font-black tracking-tighter text-[
        #212529] uppercase"
          >
            Ecom
          </h1>
        </Link>
      </div>

      {/* Nav & Search Container */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 w-full md:w-auto">
        {/* Navigation Links */}
        <div className="flex gap-6 items-center justify-center">
          <Link
            className="text-xs md:text-sm font-bold text-[#212529] hover:text-[#6c757d] transition-colors"
            to="/products"
          >
            Products
          </Link>
          <div className="relative">
            {/* Dropdown Toggle Button */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-2 text-sm font-bold text-[#212529]  hover:text-[#6c757d] transition-colors group"
            >
              Categories
              <span
                className={`text-[10px] transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {/* Dropdown Menu */}
            {open && (
              <ul className="absolute top-full left-0 mt-4 w-56 bg-white border-2 border-[#212529] shadow-[4px_4px_0px_0px_rgba(108,117,125,1)] z-50 overflow-hidden">
                {isLoading && (
                  <li className="px-4 py-3 text-[10px] font-bold uppercase tracking-tighter text-[#6c757d] animate-pulse">
                    Fetching Categories...
                  </li>
                )}

                {isError && (
                  <li className="px-4 py-3 text-[10px] font-bold uppercase text-red-500">
                    Error loading data
                  </li>
                )}

                {!isLoading &&
                  categories?.map((cat) => (
                    <li
                      key={cat}
                      className="border-b border-gray-100 last:border-none"
                    >
                      <Link
                        to={`/products/category/${cat}`}
                        className="block px-4 py-3 text-xs font-bold uppercase tracking-tight text-[#212529] hover:bg-[#212529] hover:text-white transition-all duration-200"
                        onClick={() => setOpen(false)}
                      >
                        {cat}
                      </Link>
                      <p></p>
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <Link
            to="/cart"
            className="relative text-xs md:text-sm font-bold text-[#212529]"
          >
            Cart
            {itemCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center text-[10px] font-black bg-[#e63946] text-white w-5 h-5 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};
