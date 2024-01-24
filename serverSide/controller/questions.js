import mongoose from 'mongoose';
import QAndAStorage from '../models/questions.schema.js';


export const getQuestionByLanguageAndTopic = async (req, res, next) => {
  try {
    const { languageName, topicName } = req.params; 
    console.log(topicName);

    const programmingLanguage = await QAndAStorage.findOne({ languageName: languageName });

    if (!programmingLanguage) {
      return res.status(404).json({ message: 'Programming language not found' });
    }

    const topic = programmingLanguage.topics.find(t => t.name === topicName);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    console.log(topic);
    res.status(200).json(topic);
  } catch (err) {
    console.error(err);
    next();
  }
};
export const getQuestions = async (req, res, next) => {
  try {
  

    const programmingLanguage = await QAndAStorage.findOne();

    if (!programmingLanguage) {
      return res.status(404).json({ message: 'not found' });
    }

    res.status(200).json(programmingLanguage);
  } catch (err) {
    console.error(err);
    next();
  }
};


export const getQuestionByLanguageAndLevel= async (req, res, next) => {
  try {
    const { languageName, topicName, level} = req.params;


    const programmingLanguage = await QAndAStorage.findOne({ languageName: languageName });

    if (!programmingLanguage) {
      return res.status(404).json({ message: 'Programming language not found' });
    }

    const topic = programmingLanguage.topics.find(t => t.name === topicName);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

   // const questions = topic.levels[0]?.questions;
    const NewLevel = parseInt(level)-1;

    // if (!questions) {
    //   return res.status(404).json({ message: 'Questions not found for the specified level' });
    // }

    res.status(200).json(topic.levels[NewLevel]);
  } catch (err) {
    console.error(err);
    next();
  }
};

