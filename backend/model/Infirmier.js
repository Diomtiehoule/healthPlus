const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const infirmierSchema = mongoose.Schema({
    nom : {
        type : String,
        required : true
    },
    prenom : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true,
    },
    residence : {
        type : String,
        required : true
    },
    imageURL : {
        type : String,
        required : true
    },
    hopital :{
        type : Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('Infirmier' , infirmierSchema)