import * as mongoose from 'mongoose';

const verbSchema = new mongoose.Schema({
  verb: String
});

const Verb = mongoose.model('verb', verbSchema);


export default Verb;
