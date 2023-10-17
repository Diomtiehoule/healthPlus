const Service = require('../model/Service')
const Hopital = require('../model/Hopital')
const jwt = require('jsonwebtoken')


class serviceController{

    static async create(req , res){
        
        try {
            const { userid } = req.auth;
            const hopital = await Hopital.findById(userid);
            if(!hopital){
                return res.status(400).json({message : "vous n'avez pas cette autorisation"})
            }
            const serviceExist = await Service.findOne({nomService : req.body.nomService})
            if(serviceExist){
                return res.status(400).json({message : "ce service existe déjà !!!"})
            }
            const newService = await Service.create({
                nomService : req.body.nomService,
                nomDocteur : req.body.nomDocteur,
                hopital : hopital._id,
                ...req.body
            })
            return res.status(200).json({status : true, message : "ce service à été créé avec succès !!!" , newService})

        } catch (error) {
             console.log(error)
             res.status(400).json({message : "une erreur est survenu lors du traitement !!!"})
        }
    }

    static async getOne(req, res){
       
        try {

            const { userid } = req.auth;
            const hopital = await Hopital.findById(userid);
            if(!hopital){
                return res.status(400).json({status :false , message : " nous n'avez pas cette autorisation !!!"})
            }
            const nameService = await Service.findOne({nomService : req.body.nomService})

            if(!nameService){
                return res.status(400).json({status : false , message : "aucun service trouvé !!!"})
            }
            return res.status(200).json({status : true , nameService})
            
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "une erreur est survenu lors du traitement , veuillez patienter !!!"})
        }
    }

    static async getAll(req , res){
        const  { userid } = req.auth;
        const hopital = await Hopital.findById(userid)

        try {
            if(!hopital){
                return res.status(400).json({message : "vous n'avez pas cette autorisation !!"})
            }
            await Service.find()
            .then(allService =>{
                if(!allService){
                    return res.status(400).json({message : "aucun liste disponible !!"})
                }
                res.status(200).json({status : true , message : "la liste des services dispoinible..." , allService})
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({message :"une erreur est survenu lors du traitement !!!"})
        }
    }

    static async edit(req , res){
        try {
            const { userid } = req.auth;
            const hopital = await Hopital.findById(userid)
            const { id } = req.params
            const service = await Service.findOne({_id : id})

            if(!hopital){
                return res.status(400).json({status : false , message : "vous n'avez pas cette autorisation !!!"})
            }
            if(!service){
                return res.status(400).json({status : false , message : "ce service n'existe pas !!"})
            }
            await service.updateOne({...req.body})
            .then(res.status(200).json({message : "service mis à jour avec succès !!" , service}))
            .catch(err => {
                console.log(err)
                res.status(400).json({message : "impossible de mettre le service à jours !!!"})
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "une erreur est survenu lors du traitement !!!"})
        }
    }

    static async delete(req , res){
        const { userid } = req.auth;
        const hoptital = await Hopital.findById(userid)
        const { id } = req.params
        const service = await Service.findOne({_id : id})

        try {
            
            if(!hoptital){
                return res.status(400).json({message : "vous n'avez pas cette autorisation !!"})
            }
            if(!service){
                return res.status(400).json({message : "ce service n'existe pas !!!"})
            }
            service.deleteOne({_id : id});
            return res.status(200).json({message : " cet utilisateur à été supprimé  avec succès !!" , service})

        } catch (error) {
            console.log(error)
            res.status(400).json({message : " une erreur est survenu lors du traitement !!!"})
        }
    }
}

module.exports = serviceController