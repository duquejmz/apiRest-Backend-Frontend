import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const res = await axios.get("http://localhost:3000/api/category");
    setCategories(res.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  console.log(categories);

  return (
    <div>
      <h1 className="title">List of Categories</h1>
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
                {/* <a href="editCategory.html?id=${Category._id}&name=${Category.name}">
                  Edit
                </a> */}
                <Link to={`/createCategories/${category._id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Categories;
