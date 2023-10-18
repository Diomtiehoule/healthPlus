const express = require('express')
const router = express.Router()
const docteurController = require('../controller/docteur')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer')

router.post('/create' ,multer , auth , docteurController.create);
router.post('/all' , docteurController.getAll);


module.exports = router