import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

function Calendars() {
  const [calendars, setCalendars] = useState([]);
  const navigate = useNavigate();

  const getCalendars = async () => {
    const res = await axios.get("http://localhost:3000/api/calendar");
    setCalendars(res.data);
  };

  useEffect(() => {
    getCalendars();
  }, []);

  const goHome = () => {
    navigate("/");
  };

  const deleteCalendarHandler = async (calendar) => {
    const res = await axios.delete(
      `http://localhost:3000/api/calendar/${calendar._id}`
    );
    if (res.status === 200) {
      getCalendars();
    }
  };

  return (
    <div>
      <h1 className="title">Lista de Agendas</h1>
      <div className="button-container">
        <button className="special-button" type="button" onClick={goHome}>
          Regresar
        </button>
        <Link className="special-button" to="/createCalendar">
          Crear agenda
        </Link>
      </div>
      {calendars && calendars.length === 0 ? (
        <p>No hay agendas</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Identificación</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Día Incio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="content">
            {calendars.map((calendar) => (
              <tr>
                <td>{calendar._id}</td>
                <td>{calendar.name}</td>
                <td>{calendar.description}</td>
                <td>{calendar.startDay}</td>
                <td>
                  <Link to={`/createCalendar/${calendar._id}`} className="icon-button">
                  <button>
                  <FontAwesomeIcon icon={faEdit} /> Editar
                  </button>
                  </Link>
                  <button
                      type="button"
                      onClick={() => deleteCalendarHandler(calendar)}
                      className="delete-button"
                    >
                    <FontAwesomeIcon icon={faTrash} /> Eliminar
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Calendars;
