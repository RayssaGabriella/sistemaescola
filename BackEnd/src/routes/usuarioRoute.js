import { Router } from "express";
import {
  listarUsuarios,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
} from "../controllers/usuarioController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verificarToken, listarUsuarios);
router.post("/", verificarToken, criarUsuario);
router.put("/:id", verificarToken, atualizarUsuario);
router.delete("/:id", verificarToken, deletarUsuario);

export default router;