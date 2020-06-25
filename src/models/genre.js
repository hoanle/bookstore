const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    }
});

genreSchema.methods.toJSON = function () {
    const genre = this;
    const genreObject = genre.toObject();
    delete genreObject.__v;
    return genreObject;
}

const Genre = mongoose.model("Genre", genreSchema);
module.exports = Genre;