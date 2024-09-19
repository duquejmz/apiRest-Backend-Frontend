import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Products from "./views/Products";
import Categories from "./views/Categories/Categories";
import CreateProduct from "./views/CreateProducts/CreateProduct";
import CreateCategories from "./views/CreateCategories/CreateCategories";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import CreateSuppliers from "./views/CreateSuppliers/CreateSuppliers";
import Suppliers from "./views/Suppliers";

function App() {
  return (
    <>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/createProduct" element={<CreateProduct />} />
            <Route path="/createProduct/:id" element={<CreateProduct />} />
            <Route path="/createCategories" element={<CreateCategories />} />
            <Route path="/createSuppliers" element={<CreateSuppliers />} />
            <Route
              path="/createCategories/:id"
              element={<CreateCategories />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
