import express from "express";
import autenticacaoUser from '../middleware/authenticationUser.js'
import Usuario from "../controllers/usuarioController.js";

const router = express.Router()

router.post('/usuario', Usuario.cadastrar);
router.patch('/usuario/:id', autenticacaoUser, Usuario.atualizar)
router.delete('/usuario/:id', autenticacaoUser, Usuario.deletar);
router.get('/usuario', Usuario.listar);
//router.get('/usuario/:id', Usuario.listarPorId);

export default router;