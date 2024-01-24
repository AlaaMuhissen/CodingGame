import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  id: Number,
  value: String,
});

const availableBlockSchema = new mongoose.Schema({
  id: Number,
  value: String,
});

const questionSchema = new mongoose.Schema({
  question: String,
  availableBlocks: [availableBlockSchema],
  answer: [answerSchema],
  reward: Number
});

const levelSchema = new mongoose.Schema({
  level: Number,
  questions: [questionSchema],
});

const topicSchema = new mongoose.Schema({
  level: levelSchema,
});


const languageSchema = new mongoose.Schema({
  languageName: String,
  topics: [
    {
      name: String,
      syllabusTopic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Syllabus'
      },
      levels: [topicSchema]  
    }
  ]
});

const QAndAStorage = mongoose.model("qAndaStorage", languageSchema);

export default QAndAStorage;
