import { Navbar } from "./Components/Navbar";
import { Products } from "./Pages/Products";
import { ProductDetails } from "./Pages/ProductDetails";
import { Cart } from "./Pages/Cart";
import { Category } from "./Pages/Category";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/category/:name" element={<Category />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
