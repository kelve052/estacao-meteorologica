import express from 'express';
import autenticacaoUser from '../middleware/authenticationUser.js'
import Usuario from '../controllers/usuarioControler.js';


const router = express.Router();
router.post('/usuario', Usuario.criarUsuario)


export default router;