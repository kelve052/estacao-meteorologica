import express from 'express';
import autenticacaoUser from '../middleware/authenticationUser.js'
import Usuario from '../controllers/usuarioControler.js';


const router = express.Router();
router.post('/usuario', Usuario.criarUsuario)
router.patch('/usuario/:id', Usuario.editarUsuario)


export default router;