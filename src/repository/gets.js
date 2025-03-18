import {
  TAREAS,
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
