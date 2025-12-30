import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Sort } from "../Common/Sort";
import { useState } from "react";
import { useCartStore } from "../Store/cartStore";

const fetchProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to load products");
  const data = await res.json();

  return data;
};

const ProductSkeleton = () => (
  <div className="border border-gray-300 p-4 animate-pulse bg-white">
    <div className="h-48 bg-gray-200 mb-4"></div>
    <div className="h-3 bg-gray-200 mb-2"></div>
    <div className="h-3 bg-gray-200 w-1/2 mb-4"></div>
    <div className="flex justify-between items-center">
      <div className="h-6 bg-gray-200 w-20"></div>
      <div className="h-8 bg-gray-300 w-24"></div>
    </div>
  </div>
);

export const Products = () => {
  const [sort, setSort] = useState("");
  const [query, setQuery] = useState("");

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "Price low to high") return a.price - b.price;
    if (sort === "Price high to low") return b.price - a.price;
    if (sort === "Highest rated") return b.rating.rate - a.rating.rate;
    return 0;
  });

  const filtered = sortedProducts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      {/* --- HEADER & CONTROLS SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b-2 border-[#212529]">
        {/* Left Side: Title */}
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-[#212529]">
            All Products
          </h2>
          <p className="mt-1 text-[10px] uppercase tracking-widest font-bold text-[#6c757d]">
            {query
              ? `${filtered.length} results for "${query}"`
              : `${products.length} products`}
          </p>
        </div>

        {/* Right Side: Search + Sort Container */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Bar Styled */}
          <div className="flex items-center w-full md:w-auto relative group">
            <input
              type="text"
              placeholder="SEARCH..."
              className="w-full md:w-48 lg:w-64 border-2 border-[#212529] px-4 py-2 text-[11px] font-black uppercase tracking-widest focus:outline-none bg-white placeholder-[#6c757d]"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="bg-[#212529] text-white border-y-2 border-r-2 border-[#212529] px-4 py-2 text-[11px] font-black uppercase tracking-widest active:bg-[#6c757d] transition-colors">
              GO
            </button>
          </div>

          {/* Sort Button */}
          <Sort value={sort} onChange={setSort} />
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex justify-center">
          <p className="text-red-500 font-bold uppercase">{error.message}</p>
        </div>
      )}
      {filtered.length === 0 && (
        <p className="text-xs text-[#6c757d] mt-2">
          Try a different search term
        </p>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col border border-[#6c757d] p-4 hover:border-[#212529] transition-all duration-300 bg-white hover:shadow-lg"
            >
              <Link to={`/products/${product.id}`}>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#6c757d] font-bold mb-2 block">
                  {product.category}
                </span>

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
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-sm">★★★★★</span>
                    <span className="text-[#212529] text-xs font-black ml-2">
                      {product.rating?.rate}
                    </span>
                  </div>
                  <span className="text-[#6c757d] text-[10px] font-medium">
                    ({product.rating?.count})
                  </span>
                </div>
              </Link>

              <div className="mt-auto pt-4 border-t-2 border-[#212529] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black text-[#6c757d] leading-none block">
                    Price
                  </span>
                  <span className="text-xl font-black text-[#212529]">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <button
                  className="bg-[#212529] text-white px-4 py-2 text-[10px] uppercase font-black tracking-widest border-2 border-[#212529] hover:bg-transparent hover:text-[#212529] transition-all duration-300"
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
