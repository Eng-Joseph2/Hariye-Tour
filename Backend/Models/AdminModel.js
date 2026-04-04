import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AdminSchema = new mongoose.Schema({
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
    default: "SuperAdmin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

AdminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const AdminModel = mongoose.model("Admin", AdminSchema);
mongoose.connection.once("open", async () => {
  try {
    const adminCollection = mongoose.connection.db.collection("admins");
    const indexes = await adminCollection.indexes();

    // Haddii uu jiro username_1, tirtir
    if (indexes.some((idx) => idx.name === "username_1")) {
      await adminCollection.dropIndex("username_1");
    }
  } catch (err) {
    console.log(err);
  }
});

export default AdminModel;
