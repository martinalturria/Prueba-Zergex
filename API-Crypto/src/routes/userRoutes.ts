import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const userController = new UserController();

router.post("/users/register", userController.register);
router.post("/users/login", userController.authenticate);

export default router;
