import { Router } from "express";
import {
  listarDisciplinas,
  criarDisciplina,
  atualizarDisciplina,
  deletarDisciplina
} from "../controllers/disciplinaController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Disciplinas
 *   description: CRUD de disciplinas
 */

/**
 * @swagger
 * /disciplinas:
 *   get:
 *     summary: Listar disciplinas
 *     tags: [Disciplinas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de disciplinas
 *       401:
 *         description: Não autorizado
 */
router.get("/", verificarToken, listarDisciplinas);

/**
 * @swagger
 * /disciplinas:
 *   post:
 *     summary: Criar disciplina
 *     tags: [Disciplinas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nome: Matemática
 *             carga_horaria: 80
 *     responses:
 *       201:
 *         description: Disciplina criada
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post("/", verificarToken, criarDisciplina);

/**
 * @swagger
 * /disciplinas/{id}:
 *   put:
 *     summary: Atualizar disciplina
 *     tags: [Disciplinas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da disciplina
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             nome: Matemática Avançada
 *             carga_horaria: 100
 *     responses:
 *       200:
 *         description: Atualizada
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.put("/:id", verificarToken, atualizarDisciplina);

/**
 * @swagger
 * /disciplinas/{id}:
 *   delete:
 *     summary: Deletar disciplina
 *     tags: [Disciplinas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da disciplina
 *     responses:
 *       200:
 *         description: Deletada
 *       401:
 *         description: Não autorizado
 */
router.delete("/:id", verificarToken, deletarDisciplina);

export default router;