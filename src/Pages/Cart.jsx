import { useCartStore } from "../Store/cartStore";

export const Cart = () => {
  const { cart, increase, decrease, remove, total } = useCartStore();

  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      {/* Header Section */}
      <div className="border-b-4 border-[#212529] pb-6 mb-10">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-[#212529]">
          My Bag
        </h1>
        <p className="text-[#6c757d] text-xs font-bold uppercase tracking-[0.3em] mt-2">
          {cart?.length || 0} Items Selected
        </p>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 border-b-2 border-[#212529] pb-4 mb-6 px-4">
        <h2 className="col-span-6 text-[11px] font-black uppercase tracking-widest text-[#6c757d]">
          Item
        </h2>
        <h2 className="col-span-2 text-[11px] font-black uppercase tracking-widest text-[#6c757d] text-center">
          Price
        </h2>
        <h2 className="col-span-2 text-[11px] font-black uppercase tracking-widest text-[#6c757d] text-center">
          Quantity
        </h2>
        <h2 className="col-span-2 text-[11px] font-black uppercase tracking-widest text-[#6c757d] text-right">
          Total
        </h2>
      </div>

      {/* Cart Items */}
      <div className="flex flex-col gap-8">
        {cart?.length > 0 ? (
          cart.map((item) => (
            <div
              className="relative grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-gray-200 pb-8 px-4 group"
              key={item.id}
            >
              {/* Item Info */}
              <div className="col-span-6 flex items-center gap-6">
                <div className="w-24 h-24 bg-gray-50 p-2 border border-gray-200 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#6c757d] mb-1">
                    {item.category}
                  </p>
                  <p className="font-black text-[#212529] uppercase text-sm tracking-tight leading-tight max-w-xs">
                    {item.title}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-2 text-center">
                <p className="font-black text-[#212529]">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="col-span-2 flex justify-center">
                <div className="flex items-center border-2 border-[#212529]">
                  <button
                    className="px-3 py-1 font-black hover:bg-gray-100 transition-colors border-r-2 border-[#212529]"
                    onClick={() => decrease(item.id)}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-sm font-black">
                    {item.quantity || 1}
                  </span>
                  <button
                    className="px-3 py-1 font-black hover:bg-gray-100 transition-colors border-l-2 border-[#212529]"
                    onClick={() => increase(item.id)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => remove(item.id)}
                  className="absolute right-4 top-4 text-xs font-black uppercase tracking-widest text-[#6c757d] hover:text-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>

              {/* Total */}
              <div className="col-span-2 text-right">
                <p className="text-lg font-black text-[#212529]">
                  ${(item.price * (item.quantity || 1)).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-gray-200">
            <p className="text-[#6c757d] font-black uppercase tracking-widest">
              Your bag is empty
            </p>
          </div>
        )}
      </div>

      {/* Cart Summary (Optional Layout Add-on) */}
      {cart?.length > 0 && (
        <div className="mt-12 flex justify-end">
          <div className="w-full md:w-80 bg-white border-4 border-[#212529] p-6 shadow-[8px_8px_0px_0px_rgba(33,37,41,1)]">
            <div className="flex justify-between mb-4">
              <span className="font-black uppercase text-xs tracking-widest text-[#6c757d]">
                Subtotal
              </span>
              <span className="font-black">{total().toFixed(2)}</span>
            </div>
            <button className="w-full bg-[#212529] text-white py-4 font-black uppercase tracking-widest text-xs hover:bg-transparent hover:text-[#212529] border-2 border-[#212529] transition-all">
              Checkout Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
