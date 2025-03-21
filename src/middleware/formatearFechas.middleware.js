import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatearCamposFecha = (req, res, next) => {
  try {
    const DATA = req.tareas.map((tarea) => {
      const formatFecha = (fecha) => {
        if (!fecha || new Date(fecha).getFullYear() === 1900) {
          return "";
        }
        return format(fecha, "d 'de' MMMM 'de' yyyy, h:mm a", { locale: es });
      };

      return {
        ...tarea,
        Fecha_hora_creacion: formatFecha(tarea.Fecha_hora_creacion),
        Fecha_hora_resolucion: formatFecha(tarea.Fecha_hora_resolucion),
        Fecha_limite_resolucion_SLA: formatFecha(
          tarea.Fecha_limite_resolucion_SLA
        ),
        Fecha_hora_ultima_modificacion: formatFecha(
          tarea.Fecha_hora_ultima_modificacion
        ),
        Fecha_hora_cierre: formatFecha(tarea.Fecha_hora_cierre),
        Fecha_limite_respuesta_SLA: formatFecha(
          tarea.Fecha_limite_respuesta_SLA
        ),
        Historia_tarea: tarea.Historia_tarea
          ? tarea.Historia_tarea.map((historia) => ({
              Nombre: historia.Nombre,
              Titulo: historia.Titulo,
              Mensaje: historia.Mensaje,
              Fecha: formatFecha(historia.Fecha),
            }))
          : [],
        Reabierto: tarea.Reabierto
          ? tarea.Reabierto.map((r) => ({
              Descripcion: r.Descripcion,
              Fecha: formatFecha(r.Fecha),
            }))
          : [],
      };
    });
    req.tareasFormateadas = DATA;
    return next();
  } catch (error) {
    return res.send("Error al formatear los campos");
  }
};
