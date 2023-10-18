const Ambulancier = require('../model/Ambulancier')
const Urgence = require('../model/Urgence')



class urgenceController {

    static async create(req , res){

        const { userid } = req.auth
        const ambulancier = await Ambulancier.findById(userid)

        try {
            if(!ambulancier){
                return res.status(400).json({status : false , message : "vous n'avez pas cette autorisation !!"})
            }
            await Urgence.create({
                typeUrgence : req.body.typeUrgence,
                serviceRequis : req.body.serviceRequis,
                personne : req.body.personne,
                ambulancier : ambulancier._id
            })
            return res.status(200).json({status :200 , message : "urgence signalé avec succès !!!"})

        } catch (error) {
            console.log(error)
            res.status(400).json({message : "une erreur est survenu lors du traitement !!!"})
        }
    }

    static async getAll(req , res){
        const { userid } = req.auth
        const ambulancier = await Ambulancier.findById(userid)

        try {
            if(!ambulancier){
                return res.status(400).json({message : "Vous n'avez pas cette autorisation"})
            }
            const allUrgence = await Urgence.find()
            if(!allUrgence){
                return res.status(400).json({message : "aucune liste d'urgence disponible..."})
            }
            res.status(200).json({message : "la liste de toutes les urgence..." , allUrgence})
            
        } catch (error) {
            console.log(error)
            res.status(400).json({message : " une erreur est survenu lors du traitement..."})
        }
    }
}

module.exports = urgenceController;