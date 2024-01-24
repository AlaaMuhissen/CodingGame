import { Router } from "express";
import { getAllCodeBlocks } from "../controller/blocks.js";


const router = Router();

router.get("/" , getAllCodeBlocks);
// router.get("/" , getAllHTMLBlocks);

export default router;