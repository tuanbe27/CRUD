import { Router } from "express";
import * as userControllers from "../controllers/user.controller";
const router = Router();

router.route("/").get(userControllers.getAll).post(userControllers.create);
router.route("/:id").get(userControllers.get).put(userControllers.update).delete(userControllers.remove);
export default router;
