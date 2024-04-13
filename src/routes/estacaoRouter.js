import express from 'express';
import Estacao from '../controllers/estacaoController.js';
import autenticacaoUser from '../middleware/authenticationUser.js'

const router = express.Router();
router.get('/estacoes', autenticacaoUser, Estacao.listar);
router.get('/estacoes/:id', Estacao.listar);

export default router;
