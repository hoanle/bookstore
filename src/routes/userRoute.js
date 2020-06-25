var express = require('express');
var router = express.Router();
const { register, getUserList, getMyProfile, updateMyProfile, getUser, login, logout } = require('./../controllers/userController')
const { authenticate } = require('./../services/authenticationService')

router
    .route("/users")
    .post(register)
    .get(authenticate, getUserList)

router
    .route("/users/me")
    .get(authenticate, getMyProfile)
    .put(authenticate, updateMyProfile)

router
    .route("/users/:userId")
    .get(getUser)

router
    .route("/auth/login")
    .post(login)

router
    .route("/auth/logout")
    .post(authenticate, logout)

module.exports = router;
