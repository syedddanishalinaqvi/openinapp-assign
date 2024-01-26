import Router from "express"
import { checkUser } from "../middlewares/auth.middleware.js";
import { newTaskController, taskDeleteController, taskUpdateController,allTaskController} from "../controllers/task.controller.js";

const router=Router();

//secured Routes with access tokens
router.route("/add-task").post(checkUser,newTaskController);

router.route("/delete-task/:id").put(checkUser,taskDeleteController);

router.route("/update-task/:id").put(checkUser,taskUpdateController);

router.route("/all-task").get(checkUser,allTaskController);

export default router;