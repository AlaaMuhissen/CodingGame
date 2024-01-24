import { Router } from "express";
import { getSyllabusByCreator } from "../controller/syllabus.js";


const router = Router();

router.get("/:SyllabusCreator", getSyllabusByCreator);

export default router;