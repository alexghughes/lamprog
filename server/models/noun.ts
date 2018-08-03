import * as mongoose from 'mongoose';

const nounSchema = new mongoose.Schema({
  default: String,
  dec: Number,
  proper:Number,
  definite:Number,
  allowArticledGenitive:Number,
  gen:String,
  voc:String,
  dat:String,
  gender:String,
  plNom: String,
  plGen: String
});

const Noun = mongoose.model('noun', nounSchema);


export default Noun;
