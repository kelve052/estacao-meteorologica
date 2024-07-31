import express from "express";
import autenticacaoUser from '../middleware/authenticationUser.js'
import Usuario from "../controllers/usuarioController.js";

const router = express.Router()

router.delete('/usuarios/:id', autenticacaoUser, Usuario.deletar);

export default router;