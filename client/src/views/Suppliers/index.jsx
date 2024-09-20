import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  const getSuppliers = async () => {
    const res = await axios.get("http://localhost:3000/api/suppliers");
    setSuppliers(res.data);
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  const goHome = () => {
    navigate("/");
  };

  const deleteSupplierHandler = async (supplier) => {
    const res = await axios.delete(
      `http://localhost:3000/api/suppliers/${supplier._id}`
    );
    if (res.status === 200) {
      getSuppliers();
    }
  };

  return (
    <div>
      <h1 className="title">Lista de Proveedores</h1>
      <div className="button-container">
        <button className="special-button" type="button" onClick={goHome}>
          Regresar
        </button>
        <Link className="special-button" to="/createSupplier">
          Crear proveedor
        </Link>
      </div>
      {suppliers && suppliers.length === 0 ? (
        <p>No hay proveedores</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Identification</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="content">
            {suppliers ? (
              suppliers.map((supplier) => (
                <tr key={supplier.index}>
                  <td>{supplier._id}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.address}</td>
                  <td>
                    <Link to={`/createSupplier/${supplier._id}`} className="icon-button">
                    <button>
                    <FontAwesomeIcon icon={faEdit} /> Editar
                    </button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteSupplierHandler(supplier)}
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
                <td colSpan="6"> No hay proveedores </td>{" "}
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Suppliers;
