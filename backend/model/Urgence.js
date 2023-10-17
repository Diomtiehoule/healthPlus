const mongoose = require('mongoose')
const { Schema } = require('mongoose');

const urgenceSchema = mongoose.Schema({
    typeUrgence : {
        type : String,
        required: true
    },
    serviceRequis : {
        type : String,
        required : true
    },
    personne : {
        type : Number,
        required : true
    },
    createdAt:{
        type: Date,
        required: true,
        default: new Date()
    },
    ambulancier : {
        type : Schema.Types.ObjectId
    }
},
{
    timesTamps: true
})

module.exports = mongoose.model('Urgence' , urgenceSchema);