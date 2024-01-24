import { Router } from "express";
import { createUser ,loginUser, userProfile ,userPoints ,updateUserPoints, updateUserProgress} from "../controller/users.js";
import { isAdmin ,isAuth} from "../middleware/auth.js";


const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.put("/progress", isAuth , updateUserProgress);
router.get("/profile", isAuth, userProfile);
router.get("/point", isAuth, userPoints);
router.put("/point", isAuth, updateUserPoints);

export default router;