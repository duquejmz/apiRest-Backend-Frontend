import Calendar from "../models/Servicios/calendar.js";

export async function getCalendar (req, res) {
  const calendars = await Calendar.find();
  res.json(calendars);
};

export async function getCalendarId(req, res) {
  try {
    const calendar = await Calendar.findById(req.params.id)
    if (!calendar) {
      return res.status(404).json({ msg: "Agenda no encontrado" });
    }
    res.status(200).json(calendar);
  } catch (error) {
    console.error("Error al obtener la agenda", error);
    res.status(500).json({ msg: "Error del Servidor" });
  }
}

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

export async function putCalendar(req, res) {
  try {
    const calendar = await Calendar.findByIdAndUpdate(
        req.params.id,
        req.body,
    {
        new: true,
    });
      res.status(200).json(calendar);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
}

export async function deleteCalendar(req, res) {
  try {
    const calendars = await Calendar.findById(req.params.id);

    if (!calendars) {
      return res.status(404).json({ error: "Calendar not found" });
    }
      await Calendar.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "The calendar has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

