const express = require('express')
const router = express.Router()
const urgenceController = require('../controller/urgence')
const auth = require('../middleware/auth')

router.post('/create' , auth , urgenceController.create);
router.get('/all' , auth , urgenceController.getAll);


module.exports = router