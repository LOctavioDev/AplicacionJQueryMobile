import { Router } from "express";
import {
  insertTask,
  getOneTask,
  getAllTasks,
  deleteTask,
  updateTask,
} from "../controllers/tasks.controller.js";

const router = Router();

router.get("/", getAllTasks);
router.get("/:id_task", getOneTask);
router.post("/", insertTask);
router.delete("/:id_task", deleteTask);
router.put("/:id_task", updateTask);

export default router;
