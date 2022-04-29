// import express
const express = require('express');
const methodOverride = require('method-override')
// const productController = require('./controllers/products_controller')
const controllers = require('./controllers')
// create instance
const app = express()
// Needed to get the information from the database
const db = require('./models')
// db connection
require('./config/db.connection')

// configure the app settings (used by app.listen)
const PORT = process.env.PORT || 5000;

// app configs - app.set()
app.set('view engine', 'ejs')

/* 
    EXPRESS Middleware - a later topic - this code will run for every route
*/

app.use(express.static('public'))

// method override middleware
// convert a get/post request to a delete (or put) request
app.use(methodOverride('_method'))

// body-parser middleware -> intercept the data from our post request
// take all of the data in the url-string content and create an object - req.params 
// request body -> data - parsed by the middleware
app.use(express.urlencoded({ extended: false }))

// CONTROLLERS 
app.use('/user/photos/comments', controllers.comment)
app.use('/user/photos/', controllers.photo) // photo router
app.use('/user', controllers.user) // "user" router




// "Home" route, the main page of the program 
app.get('/', async (req, res, next) => {
    try {
        const users = await db.User.find({})
        const allPhotos = await db.Photo.find({}).populate('user')
        const sortPhotos = allPhotos.sort((a,b) => {
            b.createdAt - a.createdAt
        })
        context = {
            users,
            
            photos: sortPhotos
        }
        console.log(sortPhotos)
        res.render('index.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// // get all products route
// router.get('/', async (req, res, next) => {
//     try {
//         // if(!req.session) res.redirect('/login')
//         const image = await db.image.find({});
//         const context = { image }
//         console.log(image);
//         return res.render('index.ejs', context);
//     } catch (error) {
//         console.log(error);
//         req.error = error;
//         return next();
//     }
// });

/* 
    EXPRESS Server: initializes the server; app.listen allows your computer to receive requests at http://localhost:4000/ 
*/

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))