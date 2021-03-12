const express = require('express')
const router = express.Router({mergeParams: true});
const reviews = require('../Controllers/reviews')
const {isLoggedIn, isReviewAuthor, validateReview} = require('../middleware')
const wrapAsync = require('../Utils/wrapAsync');

router.post('/', isLoggedIn, validateReview, wrapAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviews.deleteReview))

module.exports = router