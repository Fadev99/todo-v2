import express, { query } from "express";
import { lists, create, update, remove, find } from "../controllers/todosController.js";

const router = express.Router();

router.get("/lists", lists);
router.post("/create", create);
router.post('/update', update);
router.post('/remove', remove);
router.post('/find', find);

export default router;
