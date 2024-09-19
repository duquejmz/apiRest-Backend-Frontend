import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();

    // Validar que los campos no estén vacíos
    if (!email || !password || !confirmPassword) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    try {
        // Realizar la solicitud de registro
        const response = await axios.post('http://localhost:3000/api/user', {
            email,
            password
        });

        // Manejo de la respuesta del servidor
        if (response.status === 200) {
            alert(response.data.msg || 'Registro exitoso');
            navigate('/');
        } else {
            alert(`Error: ${response.data.msg || 'Error en el registro'}`);
        }
    } catch (error) {
        // Capturar y manejar cualquier error en la solicitud
        console.error('Error en la solicitud de registro:', error);
        alert('Hubo un error al realizar la solicitud.');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Registrarse</h2>
      <form className="form" id="registerForm" onSubmit={handleRegister}>
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
        <div className="form-group">
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            placeholder="Confirma tu contraseña"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          Registrarse
        </button>
        <Link to="/login" className="link">
          Iniciar Sesión
        </Link>
      </form>
    </div>
  );
}

export default Register;