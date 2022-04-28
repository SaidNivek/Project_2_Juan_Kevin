const express = require('express')
// import express to access Router function

const router = express.Router()
// creates an instance of the router 

/* 
    App Data:
    The user routes below accesses data from the 'user' DB by its _id value
*/

// MODELS
const db = require('../models')
// const { route } = require('./photo_controller')

// ===================================
/*  Beginning of Comment routes */
// ===================================

// Comment SHOW route
router.get('/:id', async (req, res, next) => {
    try {
        const allComments = await db.Comment.findById(req.params.id)
        context = {
            comments: allComments,
        }
        res.render('../views/comment/show.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// Comment NEW route
router.get('/new/:id', async (req, res, next) => {
    try { 
        const thePhoto = await db.Photo.findById(req.params.id).populate('user')
        const context = { 
            photo: thePhoto, 
        }
        console.log(thePhoto)
        console.log('==================================')
        console.log(thePhoto.user._id)
        res.render('../views/comment/new.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// Comment CREATE route
router.post('/', async (req, res, next) => {
    try {
        const newCommentData = req.body
        const newComment = await db.Comment.create(newCommentData);
        console.log('++++++++++++++++++++++++++++++++++++++++++')
        console.log(newComment)
        res.redirect(`/user/photos/${newComment.photo}`);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// Comment EDIT route

// Comment UPDATE route

// Comment DELETE route

module.exports = router