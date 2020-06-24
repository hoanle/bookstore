const Book = require('./../models/book');

exports.createBook = async (request, response) => {
    try {
        const newBook = new Book(request.body)
        console.log(`newBook ${newBook}`)
        await newBook.save();
        response.status(200).json({
            status: "success",
            data: { newBook }
        })
    } catch (error) {
        response.status(400).json({
            status: "fail",
            data: error.message
        })
    }
}

exports.updateBook = async (request, response) => {
    try {
        const book = await Book.findById(request.params.bookId)
        const fields = Object.keys(request.body);
        fields.map(f => book[f] = request.body[f]);
        await book.save();
        response.status(200).json({
            status: 'success',
            data: book
        })
    } catch (error) {
        response.status(400).json({
            status: 'fail',
            data: error.message
        })
    }
}

exports.getBookList = async (request, response) => {
    try {
        const books = await Book.find({}).limit(20)
        response.status(200).json({
            status: 'success',
            data: books
        })
    } catch (error) {
        response.status(400).json({
            status: 'fail',
            data: error.message
        })
    }
}

exports.getBook = async (request, response) => {
    try {
        const book = await Book.findById(request.params.bookId);
        if (!book) {
            throw new Error(`Can't find book with id ${request.params.bookId}`);
        }
        response.status(200).json({
            status: "success",
            data: { book }
        });
    } catch (error) {
        response.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}