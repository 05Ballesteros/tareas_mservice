import mongoose from "mongoose";
import * as Gets from "../repository/gets.js";
import { postCrearTarea } from "../repository/posts.js";

//Obtener todas las tareas del usuario con estado en base a la collection
export const getTareas = async (req, res, next) => {
    try {
        let result = [];
        const paramEstado = req.params.estado;
        const { rol, userId } = req.session.user;
        const Estado = await Gets.getEstado(paramEstado);
        if (rol === "Usuario") { 
            result = await Gets.getTareasUsuario(userId, Estado); 
        } else if (rol === "Moderador") { 
            result = await Gets.getTareasModerador(userId, Estado);
        } 
        req.tareas = result;
        return result
          ? next()
          : res
              .status(400)
              .json({ desc: "No se encotraron tareas." });
      } catch (error) {
        return res
          .status(500)
          .json({ desc: "Ocurrió un Error al obtener las tareas." });
      }
};

export const crearTarea = async (req, res, next) => {
    try {
        const session = req.mongoSession;
        if (!session) {
            return res
                .status(500)
                .json({ error: "No hay sesión activa para la transacción." });
        }
        let tareaState = req.body;
        const { userId, nombre, rol, correo } = req.session.user;
        Estado = await Gets.getEstado("NUEVOS");
        tareaState = {
            ...tareaState,
            Estado,
            Fecha_hora_creacion: obtenerFechaActual(),
            Fecha_limite_resolucion_SLA: addHours(
                obtenerFechaActual(),
                tareaState.tiempo
            ),
            Fecha_limite_respuesta_SLA: addHours(
                obtenerFechaActual(),
                tareaState.tiempo
            ),
            Fecha_hora_ultima_modificacion: obtenerFechaActual(),
            Fecha_hora_cierre: fechaDefecto,
            Fecha_hora_resolucion: fechaDefecto,
            Fecha_hora_reabierto: fechaDefecto,
            Creado_por: userId,
            standby: tareaState.standby,
            Asignado_a: tareaState.Asignado_a,
        };
        console.log(tareaState);
        const RES = await postCrearTarea(
            tareaState,
            userId,
            nombre,
            rol,
            session
        );
        if (!RES) {
            console.log("Error al guardar ticket");
            console.log("Transaccion abortada");
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({ desc: "Error al guardar el ticket." });
        }
        req.ticketIdDb = RES._id;
        req.ticket = RES;
        req.channel = "channel_crearTicket";
        console.log("ticket guardado");
        return next();
    } catch (error) {
        console.error(error);
        if (session) {
            console.log("Transaccion abortada");
            await session.abortTransaction();
            session.endSession();
        }
        return res.status(500).json({ error: "Error al guardar el ticket" });
    }
};

export const resolverTarea = async (req, res, next) => {
};

export const reasignarTarea = async (req, res, next) => {
};

export const getTareabyId = async (req, res, next) => {
    console.log("Si estoy llegando");
    const { id } = req.params;

    try {
        const RES = await Gets.getTareaPorID(id);
        if (!RES) {
            return res.status(404).json({
                desc: "No se encontro la tarea en la base de datos",
            });
        }
        req.tarea = RES;
        console.log(RES);
        return next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ desc: "Error interno en el servidor" });
    }
};