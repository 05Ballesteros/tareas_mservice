import { Router } from "express";
import {
    controllerExample
} from "../../controllers/index.controller.js";
import { verifyToken } from "../../middleware/verifyToken.middleware.js";
import { verifyRole } from "../../middleware/verifyRole.middleware.js";
import { populateTickets } from "../../middleware/populateTickets.middleware.js";
import { formatearCamposFecha } from "../../middleware/formatearFechas.middleware.js";
const router = Router();
router.get(
  "/tareas/",
  verifyToken,
  verifyRole,
  controllerExample,
  formatearCamposFecha,
  populateTickets
);

router.get(
  "/tareas/:id/",
  verifyToken,
  verifyRole,
  controllerExample,
  formatearCamposFecha,
  populateTickets
);

router.post(
  "/tareas/",
  verifyToken,
  verifyRole,
  controllerExample,
  formatearCamposFecha,
  populateTickets
);

router.put(
  "/tareas/:id/",
  verifyToken,
  verifyRole,
  controllerExample,
  formatearCamposFecha,
  populateTickets
);

export default router;