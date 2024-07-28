import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  easyAttempt: {
    type: Number,
    default: Infinity
  },
  mediumAttempt: {
    type: Number,
    default: Infinity
  },
  hardAttempt: {
    type: Number,
    default: Infinity
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  verificationToken: String,
});

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
