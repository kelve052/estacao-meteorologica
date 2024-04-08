import express from 'express';
import ClasseExemplo from '../controllers/exemploController.js';

const router = express.Router();

router.get('/listar', ClasseExemplo.listar);

export default router;
