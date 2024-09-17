import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <header class="header">
        <div class="logo">
          <a href="/Frontend/views/login.html">SoftSolutions</a>
        </div>
        <div class="user-menu">
          <span class="user-name">Bienvenido</span>
          <div class="dropdown">
            <button class="dropbtn">Login</button>
            <div class="dropdown-content">
              <a href="#" id="logout">
                Cerrar sesión
              </a>
            </div>
          </div>
        </div>
      </header>

      <div class="dashboard-grid">
        <div class="card" id="productsCard">
          <Link to="/products"><h3>Productos</h3></Link>
        </div>
        <div class="card" id="providersCard">
          <h3>Proveedores</h3>
        </div>
        <div class="card" id="categoriesCard">
          <Link to='/categories'><h3>Categorías</h3></Link>
        </div>
        <div class="card" id="agendasCard">
          <h3>Agendas</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
