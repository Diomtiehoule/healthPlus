const express = require('express')
const router = express.Router()
const hopitalController = require('../controller/hopital')

router.post('/create' , hopitalController.register);
router.post('/login' , hopitalController.login);
router.get('/all' , hopitalController.getAll);
router.delete('/delete/:id' , hopitalController.delete)
router.put('/edit/:id' , hopitalController.edit)

module.exports = router