import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getCategories = async () => {
    const res = await axios.get("http://localhost:3000/api/category");
    setCategories(res.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const goHome = () => {
    navigate("/");
  };

  const deleteCategoryHandler = async (category) => {
    const res = await axios.delete(
      `http://localhost:3000/api/category/${category._id}`
    );
    if (res.status === 200) {
      getCategories();
    }
  };

  return (
    <div>
      <h1 className="title">Lista de Categorias</h1>
      <div className="button-container">
        <button className="special-button" type="button" onClick={goHome}>
          Regresar
        </button>
        <Link className="special-button" to="/createCategory">
          Crear categoria
        </Link>
      </div>
      {categories && categories.length === 0 ? (
        <p>No hay categorias</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Identification</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="content">
            {categories.map((category) => (
              <tr>
                <td>{category._id}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <Link to={`/createCategories/${category._id}`} className="icon-button">
                  <button>
                  <FontAwesomeIcon icon={faEdit} /> Editar
                  </button>
                  </Link>
                  <button
                      type="button"
                      onClick={() => deleteCategoryHandler(category)}
                      className="delete-button"
                    >
                    <FontAwesomeIcon icon={faTrash} /> Eliminar
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Categories;
