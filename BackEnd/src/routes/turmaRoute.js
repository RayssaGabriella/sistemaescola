import { Router } from "express";
import {
  listarTurmas,
  criarTurma,
  atualizarTurma,
  deletarTurma
} from "../controllers/turmaController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Turmas
 *   description: CRUD de turmas
 */

/**
 * @swagger
 * /turmas:
 *   get:
 *     summary: Listar turmas
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turmas com professor
 *       401:
 *         description: Não autorizado
 */
router.get("/", verificarToken, listarTurmas);

/**
 * @swagger
 * /turmas:
 *   post:
 *     summary: Criar turma
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nome: Turma A
 *             ano_letivo: 2025
 *             professor_id: 1
 *     responses:
 *       201:
 *         description: Turma criada
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post("/", verificarToken, criarTurma);

/**
 * @swagger
 * /turmas/{id}:
 *   put:
 *     summary: Atualizar turma
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da turma
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             nome: Turma B
 *             ano_letivo: 2026
 *             professor_id: 1
 *     responses:
 *       200:
 *         description: Atualizada
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.put("/:id", verificarToken, atualizarTurma);

/**
 * @swagger
 * /turmas/{id}:
 *   delete:
 *     summary: Deletar turma
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da turma
 *     responses:
 *       200:
 *         description: Deletada
 *       401:
 *         description: Não autorizado
 */
router.delete("/:id", verificarToken, deletarTurma);

export default router;