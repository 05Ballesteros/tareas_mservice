import { TAREAS } from "../models/index.js";

export const populateTareas = async (req, res) => {
  try {
    const POPULATE = await TAREAS.populate(req.tareasFormateadas, [
      { path: "Tipo_incidencia", select: "Tipo_de_incidencia _id" },
      { path: "Categoria", select: "Categoria _id" },
      { path: "Servicio", select: "Servicio _id" },
      { path: "Subcategoria", select: "Subcategoria _id" },
      { path: "Prioridad" },
      { path: "Estado" },
      { path: "Medio" },
      {
        path: "Area",
        populate: [{ path: "Area", select: "Area _id" }],
      },
      {
        path: "Asignado_a",
        select: "Nombre Correo _id",
        populate: [{ path: "Area", select: "Area _id" }],
      },
      {
        path: "Reasignado_a",
        select: "Nombre Correo _id",
        populate: [{ path: "Area", select: "Area _id" }],
      },
      {
        path: "Resuelto_por",
        select: "Nombre Correo _id",
        populate: [{ path: "Area", select: "Area _id" }],
      },
      {
        path: "Creado_por",
        select: "Nombre Correo _id",
        populate: [{ path: "Area", select: "Area _id" }],
      },
      { path: "Cerrado_por", select: "Nombre Area _id" },
      {
        path: "Resuelto_por",
        select: "Nombre Correo _id",
        populate: [{ path: "Area", select: "Area _id" }],
      },
      {
        path: "Historia_ticket",
        select: "Titulo Mensaje Fecha",
        populate: {
          path: "Nombre",
          select: "Nombre -_id",
        },
      },
    ]);
    if (!POPULATE) {
      console.log("error en populate");
      return res.status(500).json({ desc: "Error al procesar las tareas." });
    }
    return res.status(200).json(POPULATE);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ desc: "Error al formatear las tareas." });
  }
};
