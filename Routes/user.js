const express = require('express')
const router = express.Router({mergeParams: true});
const wrapAsync = require('../Utils/wrapAsync');
const passport = require('passport');
const users = require('../Controllers/users')

router.route('/register')
    .get(users.renderRegister)
    .post(wrapAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login)

router.get('/logout', users.logout)

module.exports = router;