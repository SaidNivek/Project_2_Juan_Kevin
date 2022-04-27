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

// Photo NEW route
router.get('/new', (req, res) => {
    res.send('testing new photo route')
})

// Photo EDIT route



module.exports = router