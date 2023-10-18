const multer = require('multer')

// FONCTION POUR PRECISER LES EXTENSION POSSIBLE 
const MEME_TYPES = {
    "images/jpg" : 'jpg',
    'images/jpeg' : 'jpeg',
    "images/png" : "png"
}

// LE LIEU DE STOCKAGE DES FICHIER PAR LE MULTER 
const storage = multer.diskStorage({
    destination : (req , file , callback) => {
        callback(null , 'images')
    },

    // CREATION DU NOM POUR LE FICHIER 
    filename : (req , file , callback)=>{
        const name = file.originalname.split(' ').join('_');
        const extension = MEME_TYPES[file.mimetype]
        callback ( null ,  name + Date.now() + '.' + extension)
    }
})

module.exports = multer({storage : storage}).single('images');