const Hopital = require('../model/Hopital')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')


class hopitalController {
    static async register (req , res){
        try {
            console.log(req.body)
           const emailUsed = await Hopital.findOne({email : req.body.email})
           const nomHopitalUsed = await Hopital.findOne({nomHopital : req.body.nomHopital});
           const contactUsed = await Hopital.findOne({contact : req.body.contact});
           const password = req.body.password

           if(emailUsed || nomHopitalUsed || contactUsed){
            res.status(400).json({
                message : "hopital ou email ou contact déjà utilisé !"
            })
            return;
           }
           bcrypt.hash(password , 10)
           .then(hash =>{
            const hosto = new Hopital({
                nomHopital : req.body.nomHopital,
                zone : req.body.zone,
                contact : req.body.contact,
                email : req.body.email,
                password : hash
            }) 
            hosto.save()
            .then(res.status(200).json({message : "votre hoptital à été enrigistré avec succès !" , hosto}))
            
            .catch(err => res.status(400).json({message : "enregistrement impossible !"}))
           })
           .catch(err => {
            res.status(400).json({message : "un probleme est survenu" , err})
           })

        }
        catch (error) {
            res.status(400).json({message : "une erreur est survenue , veuillez reéssayer plus tard !" , error})
            console.log(error)
        }

    }

    static async login (req ,res){
        try {
            const user = await Hopital.findOne({email : req.body.email})
            
            if(!user){
                res.status(400).json({message : "cet utilisateur n'existe pas !!"})
                return;
            }
            bcrypt.compare(req.body.password , user.password)
            .then(valid =>{
                if(!valid){
                    res.status(400).json({message : "email ou mot de passe incorrect !!!"})
                    return;
                }
                res.cookie("token" , jwt.sign({userId : user._id} , "RANDOM_TOKEN_SECRET" , {expiresIn : "24h"}))
                res.status(200).json({
                    message : "Connexion éffectué avec succès !!",
                    userId :user._id,
                    token : jwt.sign(
                        {userId : user._id},
                        "RANDOM_TOKEN_SECRET",
                        {expiresIn : "24h"},
                        process.env.JWT_TOKEN_SECRET
                    )
                })
            })
        } catch (error) {
            res.status(400).json({message : "une erreur est survenu lors de la requête !!!"})
            console.log(error);
        }
    }

    static async getOne(req , res){
        const { id } = req.params
        const hotpital = await Hopital.findOne({_id : id})

        try {
            if(!hotpital){
                return res.status(400).json({message : "cet hopital n'existe pas !!!"})
            }
            res.status(200).json({message : "cet hopital existe bien !!" , hotpital})
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "une erreur est survenu lors du traitements"})
        }
    }


    static async getAll(req , res ){
        try {
            await Hopital.find()
            .then(allHopitaux =>{
                if(!allHopitaux.length){
                    return res.status(400).json({message : "la liste est vide !!!"});
                }
                res.status(200).json({message : "liste des hopitaux enregistrés..." , allHopitaux})
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({message : "une erreur s'est produite lors du traitement !!" , })
        })

        } catch (error) {
            console.log(error)
            res.status(400).json({message : " une erreur est survenu lors de la recuperation de la liste des hopitaux !!!"})
        }
    }



    static async delete(req , res){
        try {
            const { id } = req.params
            const hopital = await Hopital.findOne({_id : id})
            if(!hopital){
                res.status(400).json('erreur de recuperation !!')
                return;
            }
            hopital.deleteOne({_id : id})
            .then(res.status(200).json({message : "Hopital supprimé avec succès !!!"}))
            .catch(err => res.status(400).json({message : "impossible de supprimer cet hotpital !!"}))

        } catch (error) {
            console.log(error)
            res.status(400).json({message : "une erreur  est survenu , veuillez ressayer plus tard !!!"})
        }
    }

    static async edit(req , res){
        try {
            const { id } = req.params
            const hopital = await Hopital.findOne({_id : id});
            if(!hopital){
                res.status(400).json({message : "aucun hopital trouvé !!"})
                return;
            }
            const updateData = {
                nomHopital : req.body.nomHopital,
                ...req.body
            }
            Hopital.findByIdAndUpdate(hopital , {$set : updateData})
            .then(res.status(200).json({message : "information modifié avec succès !!!"}))
            .catch(err => {res.status(400).json({message : "une erreur s'est produite , veuillez patientez !!"}) , console.log(err)})
        } catch (error) {
            res.status(400).json({
                status : false,
                message : "une erreur est survenue , veuillez reesayer plus tard !!!"
            }, console.log(error))
        }
    }

}


module.exports = hopitalController