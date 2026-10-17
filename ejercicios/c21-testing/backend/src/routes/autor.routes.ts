import { Router } from "express";
import * as autorController from "../controllers/autor.controller";
import { validate, validateParams } from "../middlewares/validate.middleware";
import { idParamSchema, autorCreateSchema, autorUpdateSchema } from "../validations/autor.validation";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

// Lectura pública
router.get("/", autorController.getAll);
router.get("/:id", validateParams(idParamSchema), autorController.getById);
router.get("/:id/libros", validateParams(idParamSchema), autorController.getLibrosByAutor);

// Escritura resguardada (Solo ADMIN)
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(autorCreateSchema),
  autorController.create
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validateParams(idParamSchema),
  validate(autorUpdateSchema),
  autorController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validateParams(idParamSchema),
  autorController.remove
);

export default router;