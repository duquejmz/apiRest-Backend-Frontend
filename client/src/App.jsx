import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Products from "./views/Products";
import Categories from "./views/Categories/Categories";
import CreateProduct from "./views/CreateProducts/createProduct";


function App() {
  return (
    <>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/createProduct" element={<CreateProduct />} />
            <Route path="/createProduct/:id" element={<CreateProduct />} />

          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
