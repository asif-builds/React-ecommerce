import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { useCartStore } from "../Store/cartStore";

const fetchDetails = async (id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to load details");

  return res.json();
};

// Custom Skeleton for the Details Page (Full width layout)
const DetailSkeleton = () => (
  <div className="max-w-7xl mx-auto px-5 py-10 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="bg-gray-200 w-full"></div>
      <div className="space-y-6">
        <div className="h-4 bg-gray-200 w-1/4"></div>
        <div className="h-10 bg-gray-200 w-3/4"></div>
        <div className="h-6 bg-gray-200 w-1/2"></div>
        <div className="h-32 bg-gray-200 w-full"></div>
        <div className="h-12 bg-gray-300 w-full"></div>
      </div>
    </div>
  </div>
);

export const ProductDetails = () => {
  const { id } = useParams();

  const {
    data: product,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchDetails(id),
  });

  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading) return <DetailSkeleton />;

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 font-bold mb-4">{error.message}</p>
        <Link to="/products" className="underline uppercase text-xs font-bold">
          Back to products
        </Link>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-5 py-10 md:py-20">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          to="/products"
          className="text-[10px] uppercase tracking-widest text-[#6c757d] hover:text-[#212529] transition-colors"
        >
          &larr; Back to all products
        </Link>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: Product Image */}
        <div className="border border-[#6c757d] p-10 bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto  object-contain mx-auto"
          />
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.3em] text-[#6c757d] font-bold mb-2">
            {product.category}
          </span>

          <h1 className="text-3xl md:text-4xl font-black text-[#212529] uppercase leading-tight mb-4">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#6c757d]">
            <div className="flex items-center text-yellow-500">
              <span className="text-lg">★★★★★</span>
              <span className="text-[#212529] font-black ml-2 text-sm">
                {product.rating?.rate}
              </span>
            </div>
            <span className="text-[#6c757d] text-xs font-bold uppercase tracking-widest">
              {product.rating?.count} Reviews
            </span>
          </div>

          {/* Price */}
          <div className="mb-8">
            <span className="text-[10px] uppercase font-black text-[#6c757d] block">
              Price
            </span>
            <span className="text-4xl font-black text-[#212529]">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Description */}
          <div className="mb-10">
            <span className="text-[10px] uppercase font-black text-[#6c757d] block mb-2">
              Description
            </span>
            <p className="text-[#212529] leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button
            className="w-full bg-[#212529] text-white py-5 text-sm uppercase font-black tracking-[0.2em] border-2 border-[#212529] hover:bg-transparent hover:text-[#212529] transition-all duration-300 active:scale-[0.98]"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>

          {/* Extra Info */}
          <p className="mt-6 text-[10px] text-[#6c757d] uppercase text-center font-bold tracking-tighter">
            Free shipping on orders over $100 • 30-day return policy
          </p>
        </div>
      </div>
    </div>
  );
};
