import { Router } from "express";
import {
  listarAlunos,
  criarAluno,
  atualizarAluno,
  deletarAluno
} from "../controllers/alunoController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: CRUD de alunos
 */

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Listar alunos
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alunos
 *       401:
 *         description: Não autorizado
 */
router.get("/", verificarToken, listarAlunos);

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Criar aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nome: Maria
 *             cpf: 12345678900
 *             email: maria@email.com
 *             telefone: "11999999999"
 *             data_nascimento: 2005-01-01
 *             turma_id: 1
 *             status: ativo
 *     responses:
 *       201:
 *         description: Aluno criado
 *       401:
 *         description: Não autorizado
 */
router.post("/", verificarToken, criarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   put:
 *     summary: Atualizar aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do aluno
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             nome: Maria Silva
 *             cpf: 12345678900
 *             turma_id: 1
 *             status: ativo
 *     responses:
 *       200:
 *         description: Atualizado
 *       401:
 *         description: Não autorizado
 */
router.put("/:id", verificarToken, atualizarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   delete:
 *     summary: Deletar aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Deletado
 *       401:
 *         description: Não autorizado
 */
router.delete("/:id", verificarToken, deletarAluno);

export default router;