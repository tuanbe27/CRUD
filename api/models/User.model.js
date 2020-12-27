import mongoose from "mongoose";
import paginate from "./plugin/paginate";
import toJSON from "./plugin/toJSON";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, "Định dạng email không chính xác"],
  },
  address: {
    type: String,
    maxlength: 128,
  },
  age: {
    type: Number,
    min: 0,
    max: 120,
    validate: [validateInteger, "Tuổi bạn nhập không đúng định dạng"],
  },
  gender: {
    type: String,
    enum: ["male", "female", "unknown"],
    default: "unknown",
  },
}, {
  timestamps: true
});

// Function validate email
function validateEmail(v) {
  let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regex.test(v);
}
function validateInteger(v) {
  return Number.isInteger(v);
}

// Plugin
userSchema.plugin(paginate);
userSchema.plugin(toJSON);

export default mongoose.model("user", userSchema);
