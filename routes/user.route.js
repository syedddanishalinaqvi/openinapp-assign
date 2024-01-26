import Router from "express"
import {userLoginController, userRegisterController} from "../controllers/user.controller.js";

const router=Router();

//Non secured Routes
router.route("/register").post(userRegisterController);

router.route("/login").post(userLoginController);

export default router;