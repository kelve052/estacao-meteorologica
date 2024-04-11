import express from 'express';
import Estacao from '../controllers/estacaoController.js';

const router = express.Router();

router.get('/estacoes', Estacao.listar);
router.get('/estacoes/:id', Estacao.listar);


export default router;
