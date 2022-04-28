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

// ===================================
/*  Beginning of Photo routes */
// ===================================

// Photo SHOW route
router.get('/:id/', async (req, res, next) => {
    try {
        const foundPhoto = await db.Photo.findById(req.params.id).populate('user')
        const allPhotos = await db.Photo.find({photo: req.params.id})
        const allComments = await db.Comment.find({photo: req.params.id})
        const context = { 
            onePhoto: foundPhoto,
            photos: allPhotos,
            comments: allComments,
        }
        return res.render('../views/photo/show.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// Photo NEW route
router.get('/new/:id', async (req, res, next) => {
    try {
        const userId = req.params.id
        const context = { id: userId }
        res.render('../views/photo/new.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// Photo CREATE route
router.post('/', async (req, res, next) => {
    try {
        const newPhotoData = req.body
        const newPhoto = await db.Photo.create(newPhotoData);
        res.redirect(`/user/${newPhoto.user._id}`);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// Photo EDIT route
router.get('/:_id/edit', async (req,res, next)=>{
    try {
        const updatedPhoto = await db.Photo.findById(req.params._id);
        console.log(updatedPhoto);
        const context = {
            user: updatedPhoto
        }
        return res.render('../views/photo/edit', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

router.get('/:_id/edit', async (req,res, next)=>{
    try {
        const updatedUser = await db.User.findById(req.params._id);
        const context = {
            user: updatedUser
        }
        return res.render('../views/user/edit.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

/// delete and destroy route
router.delete('/:id', async (req,res, next)=>{
    try {
        const deletedPhoto = await db.Photo.findByIdAndDelete(req.params.id);
        const deletedComments = await db.Comment.deleteMany({photo: req.params.id})
        return res.redirect(`/user/${deletedPhoto.user}`)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router