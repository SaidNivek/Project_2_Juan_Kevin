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

// express.Router breakdown 
// incoming request to: http://localhost:5000/user
// in server.js we have the following code - app.use('/user', user_controller)

// the user controller's express.Router will then take on processing the request: 

// app.use passes the request {} to the user_controller.js module
// the request evaluates the available routes in the module
// if a matching URL path is found, that route's callback is executed
// otherwise, the remaining routes in server.js (after the middleware) will execute

// ===================================
/*  Beginning of User routes */
// ===================================

//Don't thibk we need this code, commenting out to check to ensure we don't
// get all user route (same as home page)
// router.get('/', async (req, res, next) => {
//     try {
//         const products = await db.Product.find({});
//         const context = { products }
//         console.log(products);
//         return res.render('index.ejs', context);
//     } catch (error) {
//         console.log(error);
//         req.error = error;
//         return next();
//     }
// });

// User "new" route - GET request- displays form for creating a new user
router.get('/new', (req, res) => {
    res.render('../views/user/new.ejs')
})

// User "show" route - GET request - display photos from one user
router.get('/:id/', async (req, res, next) => {
    try {
        const foundUser = await db.User.findById(req.params.id)
        // const allReviews = await db.Review.find({user: req.params.id})
        // console.log(allReviews.length, 'Reviews Found');
        const context = { 
            oneUser: foundUser,
            // reviews: allReviews,
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
        console.log(updatedUser);
        const context = {
            user: updatedUser
        }
        return res.render('../views/User/edit.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})



//delete route 


// User "create" route - POST request -> request body (new user data)
router.post('/', async (req, res, next) => {
    try {
        // console.log(`The req.body is ${req.body}`)
        const createdUser = await db.User.create(req.body);
        console.log(`The created User is ${createdUser}`)
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
        // delete one user (req.params.id)
        // find all photos/comments where user == req.params.id | delete those as well
        // const deletedReviews = await db.Review.deleteMany({user: req.params.id})
        // confirming the deletion of reviews 
        // 'orphan' documents in our reviews collection are removed
        console.log(deletedUser);
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
        console.log(updatedUser);
        return res.redirect(`./${req.params.id}`)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router