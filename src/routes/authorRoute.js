var express = require('express');
var router = express.Router();
const { getAuthorList, createAuthor, getAuthor, updateAuthor } = require('./../controllers/authorController')
const { authenticate } = require('./../services/authenticationService')

router
    .route("/authors")
    .get(getAuthorList)
    .post(authenticate, createAuthor)

router
    .route("/authors/:authorId")
    .get(getAuthor)
    .put(authenticate, updateAuthor)

module.exports = router;