import express from 'express';
import Autenticacao from '../controllers/autenticacaoController.js';

const router = express.Router();

router.get('/autentica', Estacao.listar);
router.get('/estacoes/:id', Estacao.listar);

export default router;
