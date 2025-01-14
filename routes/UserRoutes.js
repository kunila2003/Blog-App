const express = require('express')
const { getAllUsers, registerController, loginController } = require('../controllers/UserController')


// router object
const router = express.Router()

// GET ALL USERS || GET
router.get('/all-users', getAllUsers)
676
//CREATE USER || POST
router.post('/register', registerController)

//LOGIN || POST
router.post('/login', loginController)

module.exports = router