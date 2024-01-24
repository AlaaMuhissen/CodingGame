import Blocks from "../models/blocks.schema.js"


export const getAllCodeBlocks = async (req, res, next) => {
    try {
        const { type } = req.query; 
        if (!type) {
            return res.status(400).json({ error: "Type parameter is required." });
        }

        const blocks = await Blocks.find({ type });
        if(blocks.length ===0){
            return res.status(404).json({ error: "Type is NOT found" });
        }
        console.log("Found HTML blocks:", blocks);

        res.status(200).json(blocks);
    } catch (err) {
        console.error("Error fetching code blocks:", err);
        next(err);
    }
};