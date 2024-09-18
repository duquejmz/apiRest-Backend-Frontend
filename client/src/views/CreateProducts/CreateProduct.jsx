import { useEffect, useState } from "react";
import "./styles.css";
import Option from "../../components/Option";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function CreateProduct() {
  const { register, handleSubmit, setValue } = useForm();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const getCategories = async () => {
    const res = await axios.get("http://localhost:3000/api/category");
    setCategories(res.data);
  };

  const getProduct = async (id) => {
    const res = await axios.get(`http://localhost:3000/api/products/${id}`);
    setProduct(res.data);
  };

  useEffect(() => {
    if (params.id) {
      getProduct(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (product) {
      loadProducts();
    }
  }, [product]);

  async function loadProducts() {
    setValue("name", product.name);
    setValue("description", product.description);
    setValue("price", product.price);
    setValue("stock", product.stock);
    setValue("category", product.category);
  }

  const createProduct = (product) => {
    axios.post("http://localhost:3000/api/products", product);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      try {
        await axios.put(
          `http://localhost:3000/api/products/${params.id}`,
          data
        );
        navigate("/products");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        createProduct(data);
        navigate("/products");
      } catch (error) {
        console.error(error);
      }
    }
  });

  return (
    <div className="container">
      <h1 className="title">
        {params.id ? "Editar Producto" : "Crear Producto"}
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
        <div className="form-group">
          <label>Precio:</label>
          <input
            {...register("price")}
            type="text"
            id="price"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Existencias:</label>
          <input
            {...register("stock")}
            type="text"
            id="stock"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Categoría:</label>
          <select
            {...register("category")}
            id="categorySelect"
            className="form-control-1"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <Option
                key={category._id}
                value={category._id}
                label={category.name}
              />
            ))}
          </select>
        </div>
        <button type="submit" className="btn">
          {params.id ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
