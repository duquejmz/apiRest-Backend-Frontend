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
import CreateCalendar from "./views/CreateCalendar/CreateCalendar";
import Calendars from "./views/Agenda";

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
            <Route path="/calendars" element={<Calendars />} />
            <Route path="/createProduct" element={<CreateProduct />} />
            <Route path="/createProduct/:id" element={<CreateProduct />} />
            <Route path="/createCategory" element={<CreateCategories />} />
            <Route path="/createSupplier/:id" element={<CreateSuppliers />} />
            <Route path="/createSupplier" element={<CreateSuppliers />} />
            <Route path="/createCalendar/:id" element={<CreateCalendar />} />
            <Route path="/createCalendar" element={<CreateCalendar />} />
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
