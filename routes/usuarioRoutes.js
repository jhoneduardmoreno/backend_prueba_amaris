import express from "express";
const router = express.Router();

import { agregarUsuarios, autenticar, perfil } from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";



router.post('/login', autenticar); // Autenticacion de usuarios
router.post('/', checkAuth, agregarUsuarios); // Agregar un nuevo usuario



router.get('/perfil', checkAuth, perfil);


export default router;