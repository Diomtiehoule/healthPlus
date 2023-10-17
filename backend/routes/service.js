const serviceController = require('../controller/service')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/create' ,auth ,  serviceController.create),
router.get('/' , auth , serviceController.getOne);
router.get('/all' , auth , serviceController.getAll);
router.put('/edit/:id' , auth , serviceController.edit);
router.delete('/delete/:id' , auth , serviceController.delete);

module.exports = router;