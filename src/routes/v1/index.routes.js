import { Router } from "express";
import {
    crearTarea,
    getTareas
} from "../../controllers/tarea.controller.js";
import { verifyToken } from "../../middleware/verifyToken.middleware.js";
import { verifyRole } from "../../middleware/verifyRole.middleware.js";
import { populateTareas } from "../../middleware/populateTareas.middleware.js";
import { formatearCamposFecha } from "../../middleware/formatearFechas.middleware.js";
const router = Router();
router.get(
  "/tareas/estado/:estado",
  verifyToken,
  verifyRole(["Usuario"]),
  getTareas,
  formatearCamposFecha,
  populateTareas
);

// router.get(
//   "/tareas/:id/",
//   verifyToken,
//   verifyRole,
//   controllerExample,
//   formatearCamposFecha,
//   populateTickets
// );

//Crear tarea
router.post(
  "/tareas/crear/tarea",
  verifyToken,
  verifyRole,
  crearTarea,
  formatearCamposFecha,
  populateTareas
);

// router.put(
//   "/tareas/:id/",
//   verifyToken,
//   verifyRole,
//   controllerExample,
//   formatearCamposFecha,
//   populateTickets
// );

export default router;