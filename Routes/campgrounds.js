const express = require('express')
const router = express.Router();
const wrapAsync = require('../Utils/wrapAsync');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware')
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage})
const campgrounds = require('../Controllers/campgrounds')

router.route('/')
    .get(wrapAsync(campgrounds.index)) 
    .post(isLoggedIn, upload.array('image'), validateCampground, wrapAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, campgrounds.newCampground)

router.route('/:id')
    .get(wrapAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, wrapAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, wrapAsync(campgrounds.deleteCampground))

    

router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(campgrounds.editCampground))



module.exports = router;