const express = require('express')
const router = express.Router()
const docteurController = require('../controller/docteur')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer')

router.post('/create' ,multer , auth , docteurController.create);
router.get('/all' , auth , docteurController.getAll);
router.put('/edit/:id' , auth, docteurController.edit);


module.exports = router