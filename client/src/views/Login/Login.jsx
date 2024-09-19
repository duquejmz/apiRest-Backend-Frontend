import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./styles.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
      event.preventDefault();
  
      // Validar que los campos no estén vacíos
      if (!email || !password) {
          alert('Por favor, complete todos los campos.');
          return;
      }
  
      try {
          // Realizar la solicitud de autenticación
          const response = await axios.post('http://localhost:3000/login', {
              email,
              password
          });
  
          // Manejo de la respuesta del servidor
          if (response.status === 200) {
              alert(response.data.msg || 'Login exitoso');
              navigate('/');
          } else {
              alert(`Error: ${response.data.msg || 'Error de autenticación'}`);
          }
      } catch (error) {
          // Capturar y manejar cualquier error en la solicitud
          if (error.response) {
              // El servidor respondió con un código de estado fuera del rango 2xx
              console.error('Error en la solicitud de autenticación:', error.response.data);
              alert(`Error: ${error.response.data.msg || 'Error en la solicitud de autenticación'}`);
          } else if (error.request) {
              // La solicitud fue hecha pero no se recibió respuesta
              console.error('No se recibió respuesta del servidor:', error.request);
              alert('No se recibió respuesta del servidor. Por favor, inténtelo de nuevo más tarde.');
          } else {
              // Algo sucedió al configurar la solicitud que desencadenó un error
              console.error('Error en la configuración de la solicitud:', error.message);
              alert('Hubo un error al configurar la solicitud. Por favor, inténtelo de nuevo.');
          }
      }
  };

  return (
    <div className="container">
      <h2 className="title">Iniciar Sesión</h2>
      <form className="form" id="loginForm" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Ingresa tu correo"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Ingresa tu contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          Iniciar Sesión
        </button>
        <Link to="/register" className="link">
          Registrarse
        </Link>
      </form>
    </div>
  );
}

export default Login;