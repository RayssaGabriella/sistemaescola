import { Router } from "express";
import {
  listarProfessores,
  criarProfessor,
  atualizarProfessor,
  deletarProfessor
} from "../controllers/professorController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Professores
 *   description: CRUD de professores
 */

/**
 * @swagger
 * /professores:
 *   get:
 *     summary: Listar professores
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de professores
 *       401:
 *         description: Não autorizado
 */
router.get("/", verificarToken, listarProfessores);

/**
 * @swagger
 * /professores:
 *   post:
 *     summary: Criar professor
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nome: João
 *             email: joao@email.com
 *             telefone: "11999999999"
 *             especialidade: Matemática
 *     responses:
 *       201:
 *         description: Professor criado
 *       401:
 *         description: Não autorizado
 */
router.post("/", verificarToken, criarProfessor);

/**
 * @swagger
 * /professores/{id}:
 *   put:
 *     summary: Atualizar professor
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do professor
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             nome: Professor Atualizado
 *     responses:
 *       200:
 *         description: Atualizado
 *       401:
 *         description: Não autorizado
 */
router.put("/:id", verificarToken, atualizarProfessor);

/**
 * @swagger
 * /professores/{id}:
 *   delete:
 *     summary: Deletar professor
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do professor
 *     responses:
 *       200:
 *         description: Deletado
 *       401:
 *         description: Não autorizado
 */
router.delete("/:id", verificarToken, deletarProfessor);

export default router;