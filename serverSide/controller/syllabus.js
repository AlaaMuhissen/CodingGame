import Syllabus from "../models/syllabus.schema.js";

export const getSyllabusByCreator= async(req, res , next) =>{
    try{

        const {SyllabusCreator} = req.params;  
        const syllabus = await Syllabus.findOne({syllabusCreator: SyllabusCreator})
        console.log(syllabus);
        if (syllabus) {
            res.send(syllabus);
          } else {
            console.log('Syllabus document not found');
          }
    }catch(err){
        console.error(err);
        next();
    }
}