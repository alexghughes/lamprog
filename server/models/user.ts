import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  username: String,
  firstname: String,
  lastname: String,
  password: String
});

const User = mongoose.model('user', userSchema);

export default User;
