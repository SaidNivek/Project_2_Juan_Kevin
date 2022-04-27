const express = require('express')
// import express to access Router function

const router = express.Router()
// creates an instance of the router 

/* 
    App Data:
    The user routes below accesses data from the 'user' DB by its index value - we will use 'productId' as the param key.
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

// get all user route (same as home page)
router.get('/', async (req, res, next) => {
    try {
        const products = await db.Product.find({});
        const context = { products }
        console.log(products);
        return res.render('index.ejs', context);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

// User "new" route - GET request- displays form for creating a new product

router.get('/new', (req, res) => {
    res.render('../views/user/new.ejs')
})



// User "show" route - GET request - display details about one product 
// http://localhost:4000/products/0

router.get('/:id/', async (req, res, next) => {
    try {
        const foundProduct = await db.Product.findById(req.params.id)
        const allReviews = await db.Review.find({product: req.params.id})
        console.log(allReviews.length, 'Reviews Found');
        const context = { 
            oneProduct: foundProduct,
            reviews: allReviews,
            message: "Hello there"
        }
        return res.render('show.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})



// User "edit" route - GET request - display an edit form for one product
// http://localhost:4000/products/0/edit

router.get('/:id/edit', async (req,res, next)=>{
    try {
        const updatedProduct = await db.Product.findById(req.params.id);
        console.log(updatedProduct);
        const context = {
            product: updatedProduct
        }
        return res.render('edit.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})



// User "index" route - GET request - displays all products
// http://localhost:4000/products

// router.get('/', (req, res) => {
//     // res.send(products)
//     const context = { products }
//     res.render('index', context)
// })

// User "create" route - POST request -> request body (new product data)

// http://localhost:4000/products/

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



// User "destroy" route - DELETE request - removes data from products database and redirects to index route

// http://localhost:4000/products/0/ 

router.delete('/:id', async (req,res, next)=>{
    try {
        const deletedProduct = await db.Product.findByIdAndDelete(req.params.id);
        // delete one product (req.params.id)
        // find all reviews where product == req.params.id | delete those as well
        const deletedReviews = await db.Review.deleteMany({product: req.params.id})
        // confirming the deletion of reviews 
        // 'orphan' documents in our reviews collection are removed

        console.log(deletedReviews);
        return res.redirect('/products')
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})



// User "UPDATE" route - PUT request - update the Products array and redirects to show route
// http://localhost:4000/products/0/

router.put('/:id', async (req, res, next)=>{
    try {
        const updatedProduct = await db.Product.findByIdAndUpdate(req.params.id, req.body);
        console.log(updatedProduct);
        return res.redirect(`/products`)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})


module.exports = router