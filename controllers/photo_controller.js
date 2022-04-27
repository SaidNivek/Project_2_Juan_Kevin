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
router.get('/:id', (req, res) => {
    res.render('../views/photo/show.ejs')
})


// Photo NEW route
router.get('/new/:id', async (req, res, next) => {
    try {
        const userId = req.params.id
        console.log(userId)
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
        // console.log(`The created photo is ${newPhotoData}`)
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
        return res.render('../views/photo/edit.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})


module.exports = router