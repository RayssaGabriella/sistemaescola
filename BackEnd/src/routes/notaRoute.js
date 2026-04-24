import { Router } from "express";
import {
  listarNotas,
  criarNota,
  atualizarNota,
  deletarNota
} from "../controllers/notaController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notas
 *   description: CRUD de notas
 */

/**
 * @swagger
 * /notas:
 *   get:
 *     summary: Listar notas
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notas (com aluno e disciplina)
 *       401:
 *         description: Não autorizado
 */
router.get("/", verificarToken, listarNotas);

/**
 * @swagger
 * /notas:
 *   post:
 *     summary: Criar nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             aluno_id: 1
 *             disciplina_id: 1
 *             nota: 8.5
 *             bimestre: "1"
 *             observacao: Bom desempenho
 *     responses:
 *       201:
 *         description: Nota criada
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post("/", verificarToken, criarNota);

/**
 * @swagger
 * /notas/{id}:
 *   put:
 *     summary: Atualizar nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da nota
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             aluno_id: 1
 *             disciplina_id: 1
 *             nota: 9.0
 *             bimestre: "1"
 *             observacao: Melhorou
 *     responses:
 *       200:
 *         description: Atualizada
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.put("/:id", verificarToken, atualizarNota);

/**
 * @swagger
 * /notas/{id}:
 *   delete:
 *     summary: Deletar nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da nota
 *     responses:
 *       200:
 *         description: Deletada
 *       401:
 *         description: Não autorizado
 */
router.delete("/:id", verificarToken, deletarNota);

export default router;