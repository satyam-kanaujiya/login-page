import { Router } from "express";
import { registerUser,loginUser,logoutUser ,deleteUser,refreshUserToken} from "../controller/user.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//secure routes
router.route("/logout").post(verifyJwt,logoutUser);
router.route("/delete").post(verifyJwt,deleteUser);
router.route("/refreshAccessToken").post(refreshUserToken);

export default router;