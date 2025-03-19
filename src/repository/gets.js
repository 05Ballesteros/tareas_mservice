import {
  TAREAS,
  ESTADOS,
} from "../models/index.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;


export const getTareaPorID = async (id) => {
  try {
    const RES = await TAREAS.findOne({
      Id: id,
    }).lean();
    if (!RES) {
      return false;
    }
    return [RES];
  } catch (error) {
    return false;
  }
};

export const getAllTareas = async (paramEstado) => {
  try {
    const result = await TAREAS.findOne({
      Estado: paramEstado,
    }).lean();
    if (!result) {
      return false;
    }
    return result;
  } catch (error) {
    return false;
  }
};

export const getEstado = async (Estado) => {
  try {
    const RES = await ESTADOS.findOne({ Estado });
    return RES._id;
  } catch (error) {
    return false;
  }
};

//Tareas que tiene el usuario
export const getTareasUsuario = async (userId, Estado) => {
    try {
      const result = await TAREAS.find({
        Estado, 
        Reasignado_a: userId,
      }).lean();
      if (!result) {
        return false;
      }
      return result;
    } catch (error) {
      return false;
    }
  };

//Tareas del que tiene el moderador
export const getTareasModerador = async (userId, Estado) => {
      try {
        const result = await TAREAS.find({
          Estado, 
          Asignado_a: userId,
        }).lean();
        if (!result) {
          return false;
        }
        return result;
      } catch (error) {
        return false;
      }
    };