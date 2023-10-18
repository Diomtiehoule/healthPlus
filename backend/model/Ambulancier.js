const mongoose = require('mongoose')
const uniqueValidate = require('mongoose-unique-validator')

const ambulancierShema = mongoose.Schema({
    nom : {
        type : String,
        required :  true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    }
    ,
    password : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true,
        unique : true
    },
    structure : {
        type : String,
        required : true
    },
    imageURL : {
        type : String,
        required : true
    }
})

ambulancierShema.plugin(uniqueValidate);
module.exports = mongoose.model('Ambulancier' , ambulancierShema);