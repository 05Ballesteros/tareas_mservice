import mongoose from "mongoose";
import * as Gets from "../repository/gets.js";

//Obtener tarea por id
export const getTarea = async (req, res, next) => {
    const { id } = req.params;

    try {
        const RES = await Gets.getTareaPorID(id);
        if (!RES) {
            return res.status(404).json({
                desc: "No se encontro la tarea en la base de datos",
            });
        }
        req.tarea = RES;
        return next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ desc: "Error interno en el servidor" });
    }
};

export const crearTarea = async (req, res, next) => {
    const session = req.mongoSession;
    if (!session) {
        return res
            .status(500)
            .json({ error: "No hay sesión activa para la transacción." });
    }

    try {
        let ticketState = req.body;
        const { userId, nombre, rol, correo } = req.session.user;
        Estado = await Gets.getEstadoTicket("NUEVOS");

        ticketState = {
            ...ticketState,
            Cliente: req.cliente ? req.cliente : ticketState.Cliente,
            Estado,
            Fecha_hora_creacion: obtenerFechaActual(),
            Fecha_limite_resolucion_SLA: addHours(
                obtenerFechaActual(),
                ticketState.tiempo
            ),
            Fecha_limite_respuesta_SLA: addHours(
                obtenerFechaActual(),
                ticketState.tiempo
            ),
            Fecha_hora_ultima_modificacion: obtenerFechaActual(),
            Fecha_hora_cierre: fechaDefecto,
            Fecha_hora_resolucion: fechaDefecto,
            Fecha_hora_reabierto: fechaDefecto,
            Creado_por: userId,
            standby: ticketState.standby,
            Asignado_a: ticketState.standby ? Asignado_a._id : ticketState.Asignado_a,
        };
        const RES = await postCrearTicket(
            ticketState,
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