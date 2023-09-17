import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) throw new Error("Password not modified");

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  next();
});

const User = model("User", userSchema);

export default User;
