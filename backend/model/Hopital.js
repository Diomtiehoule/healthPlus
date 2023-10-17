const mongoose = require('mongoose');
const uniqueValidate = require('mongoose-unique-validator')


const hopitalSchema = mongoose.Schema({
    nomHopital : {
        type : String,
        required : true
    },
    zone : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true,
        unique : true
    }, 
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

hopitalSchema.plugin(uniqueValidate);
module.exports = mongoose.model('Hopital' , hopitalSchema);