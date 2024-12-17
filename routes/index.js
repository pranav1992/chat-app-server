const express = require('express')
const registerUser = require('../controller/registerUser')
const checkEmail = require('../controller/checkEmail')
const checkPassword = require('../controller/checkPassword')
const userDetails = require('../controller/userDetails')
const logout = require('../controller/logout')
const updateUserdetails = require('../controller/updateUserDetails')
const searchUser = require('../controller/searchUser')


const router = express.Router()
//create user
router.post('/register', registerUser)
//check email id exist or not
router.post('/email', checkEmail)
//verify password
router.post('/password', checkPassword)
//login user details
router.get('/user-details', userDetails)
//logout
router.get('/logout', logout)
//update userdetails
router.post("/update-user", updateUserdetails)
//search user
router.post("/search-user", searchUser)


module.exports = router