import React, { useEffect, useState } from "react";
import "./styles.css";
import Option from "../../components/Option";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function CreateProduct() {
  const { register, handleSubmit, setValue } = useForm();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const params = useParams();

  const getCategories = async () => {
    const res = await axios.get("http://localhost:3000/api/category");
    setCategories(res.data);
  };

  const getProduct = async (id) => {
    const res = await axios.get(`http://localhost:3000/api/products/${id}`);
    setProduct(res.data);
  };

  useEffect(() => {
    getProduct(params.id)
  }, [])

  useEffect(() => {
    getCategories();
    loadProducts();
  }, []);

  async function loadProducts() {
    if (params.id) {
      setValue("name", product.name);
      setValue("description", product.description)
      setValue("price", product.price);
      setValue("stock", product.stock);
    }
  }

  return (
    <div className="container">
      <h1 className="title">Editar Producto</h1>
      <form className="form">
        <div className="form-group">
          <label>Name:</label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            {...register("description")}
            type="text"
            id="description"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            {...register("price")}
            type="text"
            id="price"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Stock:</label>
          <input
            {...register("stock")}
            type="text"
            id="stock"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select id="categorySelect" className="form-control-1">
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <Option value={category._id} label={category.name} />
            ))}
          </select>
        </div>
        <button type="button" className="btn">
          Update
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
