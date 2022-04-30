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
/*  Beginning of User routes */
// ===================================

// User "new" route - GET request- displays form for creating a new user
router.get('/new', (req, res) => {
    res.render('../views/user/new.ejs')
})

// User "show" route - GET request - display photos from one user
router.get('/:id', async (req, res, next) => {
    try {
        const foundUser = await db.User.findById(req.params.id)
        const allPhotos = await db.Photo.find({user: req.params.id})
        // console.log(allReviews.length, 'Reviews Found');
        const context = { 
            oneUser: foundUser,
            photos: allPhotos,
        }
        return res.render('../views/user/show.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})


// User "edit" route - GET request - display an edit form for one user
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

// User "create" route - POST request -> request body (new user data)
router.post('/', async (req, res, next) => {
    try {
        const createdUser = await db.User.create(req.body);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// User "destroy" route - DELETE request - removes data from user database and redirects to index route
router.delete('/:id', async (req,res, next)=>{
    try {
        const deletedUser = await db.User.findByIdAndDelete(req.params.id);
        const deletedPhotos = await db.Photo.deleteMany({user: req.params.id})
        const deletedComments = await db.Comment.deleteMany({user: req.params.id})
        return res.redirect('/')
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// User "UPDATE" route - PUT request - update the User database and redirects to show route
router.put('/:id', async (req, res, next)=>{
    try {
        const updatedUser = await db.User.findByIdAndUpdate(req.params.id, req.body);
        return res.redirect(`./${req.params.id}`)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router