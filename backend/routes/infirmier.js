const express = require('express')
const router = express.Router()
const infirmierController = require('../controller/infirmier')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer')

router.post('/create' ,multer , auth , infirmierController.create);
router.get('/all' , auth , infirmierController.getAll);
router.put('/edit/:id' , auth, infirmierController.edit);


module.exports = router