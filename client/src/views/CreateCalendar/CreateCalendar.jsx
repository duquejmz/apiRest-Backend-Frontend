import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function CreateCalendar() {
  const { register, handleSubmit, setValue } = useForm();
  const [calendars, setCalendars] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getCalendars = async () => {
    const res = await axios.get("http://localhost:3000/api/calendar");
    setCalendars(res.data);
  };

  const getCalendar = async (id) => {
    const res = await axios.get(`http://localhost:3000/api/calendar/${id}`);
    setCalendar(res.data);
  };

  useEffect(() => {
    if (params.id) {
      getCalendar(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    getCalendars();
  }, []);

  useEffect(() => {
    if (calendars) {
      loadCalendars();
    }
  }, [calendar]);

  async function loadCalendars() {
    setValue("name", calendar.name);
    setValue("description", calendar.description);
    setValue("startDay", calendar.startDay);
  }

  const createCalendar = async (calendar) => {
    await axios.post("http://localhost:3000/api/calendar", calendar);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      try {
        await axios.put(
          `http://localhost:3000/api/calendar/${params.id}`,
          data
        );
        navigate("/calendars");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        createCalendar(data);
        navigate("/calendars");
      } catch (error) {
        console.error(error);
      }
    }
  });

  return (
    <div className="container">
      <h1 className="title">
        {params.id ? "Editar Agenda" : "Crear Agenda"}
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
          <label>Fecha Inicio:</label>
          <input
            {...register("startDay")}
            type="date"
            id="startDay"
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

export default CreateCalendar;
