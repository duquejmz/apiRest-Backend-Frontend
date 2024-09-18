import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    const res = await axios.get("http://localhost:3000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const formattedPrice = (product) =>
    product.price.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
    });

  const goHome = () => {
    navigate("/");
  };

  return (
    <div>
      <h1 className="title">Lista de Productos</h1>
      <div className="button-container">
        <button className="button" type="button" onClick={goHome}>
          Regresar
        </button>
        <Link className="button" to="/createProduct">
          Crear producto
        </Link>
      </div>
      {products && products.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Identification</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="content">
            {products ? (
              products.map((product) => (
                <tr key={product.index}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{formattedPrice(product)}</td>
                  <td>{product.stock}</td>
                  <td>{product.category && product.category.name}</td>
                  <td>
                    {/* <a href="editProduct.html?id=${Product._id}&name=${Product.name}">
                  Edit
                </a> */}
                    <Link to={`/createProduct/${product._id}`}>Edit</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                {" "}
                <td colSpan="6"> No hay productos </td>{" "}
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Products;
