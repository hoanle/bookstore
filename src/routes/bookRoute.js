var express = require('express');
var router = express.Router();
const { getBook, getBookList, createBook, updateBook } = require('./../controllers/bookController')
const { authenticate } = require('./../services/authenticationService')

router
    .route("/books")
    .get(getBookList)
    .post(authenticate, createBook)

router
    .route("/books/:bookId")
    .get(getBook)
    .put(authenticate, updateBook)

module.exports = router;