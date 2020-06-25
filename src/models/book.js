const mongoose = require("mongoose");
const Author = require("./author");
const Genre = require("./genre");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    },
    author: {
        type: Object
    },
    genres: {
        type: Array
    }
})
  
bookSchema.pre("save", async function (next) {
    console.log(`pre save book ${this.author}`);
    console.log(`pre save ${this.genres}`);

    this.author = await Author.findById(this.author);
    const promises = this.genres.map(async (id) => {
        console.log(id)
        const genre  = await Genre.findById(id);
        console.log(genre);
        return genre;
    });
    
    this.genres = (await Promise.all(promises)).filter(Boolean);
    next();
});

bookSchema.methods.toJSON = function () {
    const book = this;
    const bookObject = book.toObject();
    delete bookObject.__v;
    return bookObject;
}

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;