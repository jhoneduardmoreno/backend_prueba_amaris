import express from "express";
const router = express.Router();

import checkAuth from "../middleware/checkAuth.js";
import { agregarTestimonio, editarTestimonio, eliminarTestimonio } from "../controllers/testimoniosController.js";

router.post('/', checkAuth, agregarTestimonio);

router
    .route('/:id')
    .put(checkAuth, editarTestimonio)
    .delete(checkAuth, eliminarTestimonio)

export default router;