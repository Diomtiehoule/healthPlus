const Docteur = require('../model/Docteur')
const Hopital = require('../model/Hopital')

class docteurController {

    static async create(req , res){
 
        const docteurExist = await Docteur.findOne({nom : req.body.nom , prenom : req.body.prenom , service : req.body.service})
        const contactExist = await Docteur.findOne({contact : req.body.contact})
        const { userid } = req.auth;
        const hopital = await Hopital.findById(userid)

        try {

            if(!hopital){
                return res.status(400).json({message : "vous n'avez pas l'autorisation pour cette requête !!!"})
            }
            const newDocteur = await Docteur.create({
                nom : req.body.nom,
                hopital: hopital._id,
                ...req.body
            })
            if(docteurExist){
                return res.status(400).json({message : " Cet utilisateur existe déjà !!"})
            }
            if(contactExist){
                return res.status(400).json({message : " Cet contact est déjà utilisé !"})
            }
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

    static async edit(req , res){

        const { userid } = req.auth;
        const hopital = await Hopital.findById(userid)

        try {
            if(!hopital){
                return res.status(400).json({message : "vous n'êtes pas autorisé à effectuer cette operation !"})
            }
            const { id } = req.params
            const docteur = await Docteur.findOne({_id : id})
            if(!docteur){
                return res.status(400).json({message : "ce docteur n'existe pas..."})
            }
            const docteurExiste = await Docteur.findOne({nom : req.body.nom , prenom : req.body.prenom , service : req.body.service , contact : req.body.contact})
            if(docteurExiste){
                return res.status(400).json({message : "cet docteur existe déjà dans cette hopital !!"})
            }
            const contactUsed = await Docteur.findOne({contact : req.body.contact})
            if(contactUsed){
                return res.status(400).json({message : "cet contact est déjà utilisé !!!"})
            }
            await docteur.updateOne({
                ...req.body
            })
            .then(res.status(200).json({message : "les information du docteur ont été modifié !!!" , docteur }))
            .catch(err => {
                console.log(err)
                res.status(400).json({message : "echec de la mise a jour des information du medecin"});
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "une erreur est survenu lors du traitement !!"})
        }
    }
}

module.exports = docteurController