import "./styles.css";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <header className="header">
        <div className="logo">
          <a href="/Frontend/views/login.html">SoftSolutions</a>
        </div>
        <div className="user-menu">
          <span className="user-name">Bienvenido</span>
          <div className="user-access">
            <div className="dropdown">
              <Link to="/login" className="dropbtn">
                Login
              </Link>
              <div className="dropdown-content">
                <Link to="/login" id="logout">
                  Cerrar sesión
                </Link>
              </div>
            </div>
            <Link to="/register" className="dropbtn">
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="card" id="productsCard">
          <Link to="/products">
            <h3>Productos</h3>
          </Link>
        </div>
        <div className="card" id="providersCard">
        <Link to="/suppliers">
            <h3>Proveedores</h3>
          </Link>
        </div>
        <div className="card" id="categoriesCard">
          <Link to="/categories">
            <h3>Categorías</h3>
          </Link>
        </div>
        <div className="card" id="agendasCard">
        <Link to="/calendars">
            <h3>Agendas</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
