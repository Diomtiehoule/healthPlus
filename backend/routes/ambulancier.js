const express = require('express')
const router = express.Router()
const ambulancierController = require('../controller/ambulancier');
const multer = require('../middleware/multer');

router.post('/create' ,multer , ambulancierController.create);
router.post('/login' , ambulancierController.login);
router.get('/all' , ambulancierController.getAll);
router.get('/:id' , ambulancierController.getOne)
router.put('/edite/:id' , ambulancierController.edite)
router.delete('/delete/:id' , ambulancierController.delete)


module.exports = router