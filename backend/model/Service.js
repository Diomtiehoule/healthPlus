const mongoose = require('mongoose')
const { Schema , model } = require('mongoose')
const uniqueValidate = require('mongoose-unique-validator')

const serviceSchema = mongoose.Schema({
    nomService : {
        type : String,
        required : true,
        unique : true
    },
    nomDocteur : {
        type : String,
        required : true
    },
    capacite : {
        type : Number,
        required : true
    },
    status :{
        type : Number,
        default: 1, 
        required : true
    },
    // renvoi l'identifiant de celui qui crée le service 
    hopital: {
        type: Schema.Types.ObjectId
    }
})

serviceSchema.plugin(uniqueValidate);
module.exports = mongoose.model('Service' , serviceSchema);