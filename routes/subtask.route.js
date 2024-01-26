import Router from "express"
import { checkUser } from "../middlewares/auth.middleware.js";
import { newSubTaskController, subTaskDeleteController,subTaskUpdateController,allSubTaskController} from "../controllers/subtask.controller.js";

const router=Router();

//secured Routes with access tokens
router.route("/add-sub-task").post(checkUser,newSubTaskController);

router.route("/delete-sub-task/:id").put(checkUser,subTaskDeleteController);

router.route("/update-sub-task/:id").put(checkUser,subTaskUpdateController);

router.route("/all-sub-task").get(checkUser,allSubTaskController);

export default router;