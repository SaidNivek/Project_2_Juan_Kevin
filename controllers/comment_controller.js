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
/*  Beginning of Comment routes */
// ===================================

// Comment SHOW route
router.get('/:id', async (req, res, next) => {
    try {
        const allComments = await db.
        res.render('../views/comment/show.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// Comment NEW route

// Comment EDIT route

// Comment UPDATE route

// Comment DELETE route

module.exports = router