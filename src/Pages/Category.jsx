import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { Sort } from "../Common/Sort";
import { useState } from "react";
import { useCartStore } from "../Store/cartStore";

const fetchCategory = async (name) => {
  const res = await fetch(`https://fakestoreapi.com/products/category/${name}`);

  if (!res.ok) throw new Error("Failed to load data");

  return await res.json();
};

export const Category = ({ cart, setCart }) => {
  const [sort, setSort] = useState("");
  const { name } = useParams();

  const {
    data: products = [],
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", "category", name],
    queryFn: () => fetchCategory(name),
  });

  const addToCart = useCartStore((state) => state.addToCart);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "Price low to high") return a.price - b.price;
    if (sort === "Price high to low") return b.price - a.price;
    if (sort === "Highest rated") return b.rating.rate - a.rating.rate;
    return 0;
  });

  if (isLoading)
    return (
      <div className="max-w-7xl mx-auto px-5 py-20 text-center">
        <p className="text-[#6c757d] font-black uppercase tracking-widest animate-pulse">
          Loading {name}...
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="max-w-7xl mx-auto px-5 py-20 text-center">
        <p className="text-red-500 font-bold uppercase">{error.message}</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <div className="flex justify-between items-end mb-10 border-b-2 border-[#212529] pb-4">
        <div>
          <span className="text-[10px] uppercase font-black text-[#6c757d] tracking-[0.3em]">
            Collection
          </span>
          <h1 className="text-4xl font-black text-[#212529] uppercase tracking-tighter">
            {name}
          </h1>
          <p className="text-[#6c757d] text-[10px] font-bold uppercase tracking-widest mt-1">
            {products?.length} Items
          </p>
        </div>
        <Sort onChange={setSort} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col border border-[#6c757d] p-4 hover:border-[#212529] transition-all duration-300 bg-white hover:shadow-lg"
          >
            {/* ONLY TOP SECTION IS A LINK */}
            <Link
              to={`/products/${product.id}`}
              className="flex flex-col flex-1"
            >
              <div className="relative overflow-hidden mb-4 bg-gray-50 p-2">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <p className="font-bold text-[#212529] text-sm uppercase tracking-tight mb-1 line-clamp-1">
                {product.title}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-500 text-sm">★★★★★</span>
                <span className="text-[#212529] text-xs font-black">
                  {product.rating?.rate}
                </span>
              </div>
            </Link>

            {/* PRICE & BUTTON ARE OUTSIDE THE LINK */}
            <div className="mt-auto pt-4 border-t-2 border-[#212529] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-black text-[#6c757d] block">
                  Price
                </span>
                <span className="text-xl font-black text-[#212529]">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="bg-[#212529] text-white px-4 py-2 text-[10px] uppercase font-black tracking-widest border-2 border-[#212529] hover:bg-transparent hover:text-[#212529] transition-all duration-300"
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
