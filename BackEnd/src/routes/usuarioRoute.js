import { Router } from "express";

import { listarUsuarios } from "../controllers/usuarioController.js";

const router = Router();

router.get("/", listarUsuarios);

export default router;