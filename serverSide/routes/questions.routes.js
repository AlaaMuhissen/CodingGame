import { Router } from "express";
import { getQuestionByLanguageAndTopic, getQuestionByLanguageAndLevel  ,getQuestions} from "../controller/questions.js";


const router = Router();
router.get("/question", getQuestions);

router.get("/question/:languageName/:topicName", getQuestionByLanguageAndTopic);

router.get("/question/:languageName/:topicName/:level", getQuestionByLanguageAndLevel);

export default router;