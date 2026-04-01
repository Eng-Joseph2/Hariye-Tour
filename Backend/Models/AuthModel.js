import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    googleId: { type: String, unique: true, sparse: true },
    githubId: { type: String, unique: true, sparse: true },
    avatar: { type: String },
  },
  { timestamps: true },
);

const AuthModel = mongoose.model("Auth", AuthSchema);
export default AuthModel;
