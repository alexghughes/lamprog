import * as mongoose from 'mongoose';

const ruleSchema = new mongoose.Schema({
  type: String,
  text: String
});

const Rule = mongoose.model('rule', ruleSchema);

export default Rule;
