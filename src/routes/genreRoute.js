var express = require('express');
var router = express.Router();
const { getGenreList, createGenre, getGenre, updateGenre } = require('./../controllers/genreController')
const { authenticate } = require('./../services/authenticationService')

router
  .route("/genres")
  .get(getGenreList)
  .post(authenticate, createGenre)

router
  .route("/genres/:genreId")
  .get(getGenre)
  .put(authenticate, updateGenre)

  module.exports = router;