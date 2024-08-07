import express from "express";
import autenticacaoUser from '../middleware/authenticationUser.js'
import Usuario from "../controllers/usuarioController.js";

const router = express.Router()

router.post('/usuario', Usuario.cadastrar);
router.patch('/usuario/:id', autenticacaoUser, Usuario.atualizar)
router.delete('/usuarios/:id', autenticacaoUser, Usuario.deletar);

export default router;