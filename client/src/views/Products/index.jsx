import axios from "axios";
import './styles.css'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

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

  const deleteProductHandler = async (product) => {
    const res = await axios.delete(
      `http://localhost:3000/api/products/${product._id}`
    );
    if (res.status === 200) {
      getProducts();
    }
  };

  return (
    <div>
      <h1 className="title">Lista de Productos</h1>
      <div className="button-container">
        <button className="special-button" type="button" onClick={goHome}>
          Regresar
        </button>
        <Link className="special-button" to="/createProduct">
          Crear producto
        </Link>
      </div>
      {products && products.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Identificacion</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Existencias</th>
              <th>Categoria</th>
              <th>Acciones</th>
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
                    <Link to={`/createProduct/${product._id}`} className="icon-button">
                      <button>
                        <FontAwesomeIcon icon={faEdit} /> Editar
                      </button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteProductHandler(product)}
                      className="delete-button"
                    >
                      <FontAwesomeIcon icon={faTrash} /> Eliminar
                    </button>
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
