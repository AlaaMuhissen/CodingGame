import mongoose from "mongoose";

const blocksSchema = new mongoose.Schema({
   "type": String,
   "symbols" : Array,
   "tags": Array,
   "attributes": Object
})

const Blocks = mongoose.model("blocks" , blocksSchema);

export default Blocks;