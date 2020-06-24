const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  name: {
      type: String, 
      required: [true, "Author name is required"],
      trim: true
  }, 
  email: {
      type: String, 
      required: [true, "Email is required"], 
      trim: true, 
      unique: true
  }
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;