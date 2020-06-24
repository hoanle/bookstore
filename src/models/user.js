const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
      type: String, 
      required: [true, "User name is required"],
      trim: true
  }, 
  email: {
      type: String, 
      required: [true, "Email is required"], 
      trim: true, 
      unique: true
  }, 
  password: {
      type: String, 
      required: [true, "Password is required"], 
      trim: true,
      validate: {
        validator: function(v) {
          return v.length > 6;
        },
        message: `Password must be longer than 6 characters!`
      },
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;