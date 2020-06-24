const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });
const bodyParser = require('body-parser')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const router = express.Router();
var indexRouter = require('./routes/index');
const { createAuthor, updateAuthor, getAuthorList, getAuthor } = require("./src/controllers/authorController");
const { createUser, updateUser, getUser, getUserList } = require("./src/controllers/userController");
const { createBook, updateBook, getBook, getBookList } = require("./src/controllers/bookController");
const { createGenre, updateGenre, getGenre, getGenreList } = require("./src/controllers/genreController");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(router);
app.use("/", indexRouter)

router
  .route("/authors")
  .get(getAuthorList)
  .post(createAuthor)
  
router
  .route("/authors/:authorId")
  .get(getAuthor)
  .put(updateAuthor)

router
  .route("/users")
  .get(getUserList)
  .post(createUser)

router
  .route("/users/:userId")
  .get(getUser)
  .put(updateUser) 

  router
  .route("/books")
  .get(getBookList)
  .post(createBook)

router
  .route("/books/:bookId")
  .get(getBook)
  .put(updateBook) 


  router
  .route("/genres")
  .get(getGenreList)
  .post(createGenre)

router
  .route("/genres/:genreId")
  .get(getGenre)
  .put(updateGenre) 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.SERVER_PORT, () => console.log(`Example app listening at http://localhost:${process.env.SERVER_PORT}`));
mongoose.connect(process.env.DB_LOCAL, { 
  useCreateIndex: true, 
  useNewUrlParser: true, 
  useFindAndModify: false, 
  useUnifiedTopology: true 
  })
  .then(()=> console.log("connected to database"))

module.exports = app;