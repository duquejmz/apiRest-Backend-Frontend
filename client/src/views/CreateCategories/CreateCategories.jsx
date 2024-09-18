import { useEffect, useState } from "react";
import "./styles.css";
import Option from "../../components/Option";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import category from "../../../../models/Servicios/category";

function CreateCategory() {
  const { register, handleSubmit, setValue } = useForm();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getCategories = async () => {
    const res = await axios.get("http://localhost:3000/api/category");
    setCategories(res.data);
  };

  const getCategory = async (id) => {
    const res = await axios.get(`http://localhost:3000/api/category/${id}`);
    setCategory(res.data)
  }
  
  useEffect(() => {
    getCategories();
  }, []);
  
  useEffect(() => {
    if (params.id) {
      getCategory(params.id);
    }
  }, [params.id]);
  
  useEffect(() => {
    if (category) {
      loadCategories();
    }
  }, [category]);
  
  async function loadCategories() {
    setValue("name", category.name);
    setValue("description", category.description);
  }

  const createCategory = (category) => {
    axios.post("http://localhost:3000/api/category", category);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      try {
        await axios.put(
          `http://localhost:3000/api/category/${params.id}`,
          data
        );
        navigate("/categories");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        createCategory(data);
        navigate("/categories");
      } catch (error) {
        console.error(error);
      }
    }
  });

  return (
    <div className="container">
      <h1 className="title">
        {params.id ? "Editar Categoria" : "Crear Categoria"}
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
          <label>Descripción:</label>
          <input
            {...register("description")}
            type="text"
            id="description"
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

export default CreateCategory;
