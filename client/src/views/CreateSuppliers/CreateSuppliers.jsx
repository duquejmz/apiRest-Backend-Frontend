import { useEffect, useState } from "react";
import './styles.css'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";


function CreateSuppliers() {
  const { register, handleSubmit, setValue } = useForm();
  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getSuppliers = async () => {
    const res = await axios.get("http://localhost:3000/api/suppliers");
    setSuppliers(res.data);
  };

  const getSupplier = async (id) => {
    const res = await axios.get(`http://localhost:3000/api/suppliers/${id}`);
    setSupplier(res.data)
  }
  
  useEffect(() => {
    getSuppliers();
  }, []);
  
  useEffect(() => {
    if (params.id) {
      getSupplier(params.id);
    }
  }, [params.id]);
  
  useEffect(() => {
    if (supplier) {
      loadSuppliers();
    }
  }, [supplier]);
  
  async function loadSuppliers() {
    setValue("name", supplier.name);
    setValue("email", supplier.email);
    setValue("phone", supplier.phone);
    setValue("address", supplier.address);
  }

  const createSupplier = async (supplier) => {
    try {
      await axios.post("http://localhost:3000/api/suppliers", supplier);
    } catch (error) {
      console.error( 'Error al crear al proveedor', error );
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      try {
        await axios.put(
          `http://localhost:3000/api/suppliers/${params.id}`,
          data
        );
        navigate("/suppliers");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        createSupplier(data);
        navigate("/suppliers");
      } catch (error) {
        console.error(error);
      }
    }
  });

  return (
    <div className="container">
      <h1 className="title">
        {params.id ? "Editar Proveedor" : "Crear Proveedor"}
      </h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            {...register("email")}
            type="text"
            id="email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Telefono:</label>
          <input
            {...register("phone")}
            type="text"
            id="phone"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Direccion:</label>
          <input
            {...register("address")}
            type="text"
            id="address"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn">
          {params.id ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
}

export default CreateSuppliers;
