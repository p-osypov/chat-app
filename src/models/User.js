import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userColor: { type: String, required: true }
});

UserSchema.pre('save', async function (next) {
  const user = this;
  if (this.isModified('password') || user.isNew) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  }
  next();
});

export default mongoose.model('User', UserSchema);
