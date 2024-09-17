import Calendar from "../models/Servicios/calendar.js";

export async function getCalendar (req, res) {
  const calendars = await Calendar.find();
  res.json(calendars);
};

export async function postCalendar (req, res) {
  try {
      const { name, description, startDate } = req.body;

      // Imprime los datos que recibes para verificar que req.body tenga la información correcta
      console.log("Datos recibidos:", { name, description, startDate });

      // Crea un nuevo documento
      const newCalendar = new Calendar({
          name,
          description, 
          startDate
      });

      // Guarda el documento en la base de datos
      await newCalendar.save();

      // Devuelve una respuesta exitosa
      res.status(201).json(newCalendar);
  } catch (error) {
      // Imprime el error para ayudar a depurar
      console.error("Error al guardar el documento:", error);

      // Devuelve una respuesta de error
      res.status(500).json({ msg: "Error al guardar el documento", error });
  }
};
