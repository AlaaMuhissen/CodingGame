import mongoose from "mongoose";

const SyllabusTopicSchema = new mongoose.Schema({
  language: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QAndAStorage'
  },
  lanName : String,
  icon : String,
  levelNum: Number,
  topics: [String],
  minLevelQuestion: Number,
  maxPoints: Number,
  minPoints: Number,
});

const SyllabusObjectSchema = new mongoose.Schema({
  syllabusCreator: String,
  syllabusContent: [SyllabusTopicSchema],
});

const Syllabus = mongoose.model("syllabuses" , SyllabusObjectSchema);

export default Syllabus;