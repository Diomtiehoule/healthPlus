const Docteur = require('../model/Docteur')
const Hopital = require('../model/Hopital')

class docteurController {

    static async create(req , res){
 
        const docteurExist = await Docteur.findOne({nom : req.body.nom , prenom : req.body.prenom , service : req.body.service})
        const contactExist = await Docteur.findOne({contact : req.body.contact})
        const { userid } = req.auth;
        const hopital = await Hopital.findById(userid)

        try {
            if(docteurExist){
                return res.status(400).json({message : " Cet utilisateur existe déjà !!"})
            }
            if(contactExist){
                return res.status(400).json({message : " Cet contact est déjà utilisé !"})
            }
            const newDocteur = await Docteur.create({
                nom : req.body.nom,
                hopital: hopital._id,
                ...req.body
            })
            return res.status(200).json({message : "Docteur ajouté avec succès !!" , newDocteur})
            
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "une erreur  est survenu lors du traitement !!!"})
        }
        
    }


    static async getAll(req , res){
        const { userid } = req.auth
        const hopital = await Hopital.findById(userid)

        try {
            if(!hopital){
                return res.status(400).json({message : "vous n'avez pas cette autorisation !"})
            }
            await Docteur.find()
            .then(allDocteur =>{
                if(!allDocteur){
                    return res.status(400).json({message : "aucun liste des docteur disponible !"})
                }
                return res.status(200).json({message : "la liste des docteurs enregistré..." , allDocteur})
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "une erreur s'est produites lors du traitement !!!"})
        }
    }
}

module.exports = docteurController