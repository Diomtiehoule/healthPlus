const Infirmier = require('../model/Infirmier')
const Hopital = require('../model/Hopital')

class infirmierController {

    static async create(req , res){
 
        const infirmierExist = await Infirmier.findOne({nom : req.body.nom , prenom : req.body.prenom , service : req.body.service})
        const contactExist = await Infirmier.findOne({contact : req.body.contact})
        const { userid } = req.auth;
        const hopital = await Hopital.findById(userid)

        try {


            if(infirmierExist){
                return res.status(400).json({message : " Cet utilisateur existe déjà !!"})
            }
            if(contactExist){
                return res.status(400).json({message : " Cet contact est déjà utilisé !"})
            }
            const newInfirmier = await Infirmier.create({
                nom : req.body.nom,
                hopital: hopital._id,
                ...req.body
            })
            return res.status(200).json({message : "Infirmié ajouté avec succès !!" , newInfirmier})
            
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
            await Infirmier.find()
            .then(allInfirmier =>{
                if(!allInfirmier){
                    return res.status(400).json({message : "aucun liste des infirmier disponible !"})
                }
                return res.status(200).json({message : "la liste des infirmier enregistré..." , allInfirmier})
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
            const infirmier = await Infirmier.findOne({_id : id})
            if(!infirmier){
                return res.status(400).json({message : "ce docteur n'existe pas..."})
            }
            const infirmierExiste = await Infirmier.findOne({nom : req.body.nom , prenom : req.body.prenom , service : req.body.service , contact : req.body.contact})
            if(infirmierExiste){
                return res.status(400).json({message : "cet infirmier existe déjà dans cette hopital !!"})
            }
            const contactUsed = await Infirmier.findOne({contact : req.body.contact})
            if(contactUsed){
                return res.status(400).json({message : "cet contact est déjà utilisé !!!"})
            }
            await infirmier.updateOne({
                ...req.body
            })
            .then(res.status(200).json({message : "les information du docteur ont été modifié !!!" , infirmier }))
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

module.exports = infirmierController