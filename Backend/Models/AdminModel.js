import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Fadlan qor magaca isticmaalaha (username)"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Fadlan qor emaylkaaga"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Fadlan qor password-ka"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["Admin", "SuperAdmin"],
    default: "Admin",
  },
  profileImage: {
    type: String,
    default: "default-admin.png",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AdminModel = mongoose.model("Admin", AdminSchema);
export default AdminModel;
