const Ambulancier = require('../model/Ambulancier')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/token')
const jwt = require('jsonwebtoken')

class ambulancierController{


    static async create(req , res){
        try {
            console.log(req.body)
            const contactUsed = await Ambulancier.findOne({contact : req.body.contact})
            const emailUsed = await Ambulancier.findOne({email : req.body.email})
            const password = req.body.password

        if(contactUsed || emailUsed){
            res.status(400).json({
                message : "email ou contact déjà utilisé !!!"
            })
            return;
        }
        bcrypt.hash(password , 10)
        .then(hash => {
            const creatAmbulancier = new Ambulancier({
                nom : req.body.nom,
                email : req.body.email,
                contact : req.body.contact,
                structure : req.body.structure,
                password : hash
            })
            creatAmbulancier.save()
            .then(res.status(200).json({message : "ambulancier enrigistré avec succès !"}))

             .catch((error ) => {
                console.log(error)
                res.status(400).json({message : "enregistrement impossible !"})
            })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({message : "une erreur s'est produite , veuillez réessayer plus tard !!!" , err})
            })

        } 
        catch (error) {
            res.status(400).json({message: "une erreur s'est produite------------" , error})
            console.log(error)
        }
        
    }

    static async login(req , res){
        try {
            const email = req.body.email
        const user = await Ambulancier.findOne({email : email})
        if(!user){
           return  res.status(400).json({message : "aucun utilisateur trouvé !!!"})
        }
        bcrypt.compare(req.body.password , user.password)
        .then(valid =>{
            if(!valid){
                res.status(400).json({message : " adresse mail / mot de passe incorrect "})
                return;
            }
            res.cookie("token" , jwt.sign({userId : user._id}, "RANDOM_TOKEN_SECRET" , {expiresIn: "24h"}))
            res.status(200).json({
                    message : "Connexion éffectué avec succès !!",
                    userId :user._id,
                    token : jwt.sign(
                        {userId : user._id},
                        "RANDOM_TOKEN_SECRET",
                        {expiresIn: "24h"}
                        )
            })
        })
        .catch((err)=>{
            console.log(err)
            res.status(400).json({message : "une erreur est survenu , veuillez patientez... !!!"})
        })
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "une erreur s'est produite lors de la requête.."})
            
        }
        
    }

    static async getAll(req , res ){
        try {
            await Ambulancier.find()
            .then(allAmbulancier =>{
                if(!allAmbulancier){
                    res.status(400).json({message : "la liste est vide !!!"})
                    return
                }
                res.status(200).json({message : "liste des ambulanciers enregistrés..." , allAmbulancier})
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({message : "une erreur s'est produite lors du traitement !!" , })
        })

        } catch (error) {
            console.log(error)
            res.status(400).json({message : " une erreur est survenu lors de la recuperation de la liste des ambulanciers !!!"})
        }
    }

    static async getOne(req , res ){
        try {
            const { id } = req.params;
            const user = await Ambulancier.findOne({_id : id})
            
            if(!user){
                res.status(400).json({status :false , message : "cet utilisateur n'existe pas !!!"})
            }
            res.status(200).json({message : 'cet utilsateur existe ...' , user});

        } catch (error) {
            console.log(error)
            res.status(400).json({status : false , message : " une erreur est survenu , veuillez réessayer !!!"})
        }
    }

    static async edite(req , res){
        try {
            const { id } = req.params
            const ambulancier = await Ambulancier.findOne({ _id : id })
            const emailUsed = await Ambulancier.findOne({email : req.body.email})
            const contactUsed = await Ambulancier.findOne({contact : req.body.contact})
            if(!ambulancier){
                res.status(400).json({status : false , message : "une  erreur s'est produite"})
                return;
            }
            console.log(ambulancier)
            const updateData = {
                "nom" : req.body.nom,
                ...req.body
            }
            if(emailUsed || contactUsed){
                res.status(400).json({message : "adresse email / contact existe déjà !!!"})
                return;
            }
            Ambulancier.findByIdAndUpdate(ambulancier , {$set : updateData})
            .then(res.status(200).json({message : " vos information ont étés modifiés avec succès !!!"}))
            .catch(err =>{
                console.log(err)
                res.status(400).json({message : "une erreur s'est produite lors du traitement !!!"})
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({message : " une erreur est survenu , veuillez patienter !!!"})
        }
        
    }

    static async delete(req , res){
        try {
            const { id } = req.params
            const user = await Ambulancier.findOne({ _id : id})

            if(!user){
                res.status(400).json({message : "aucun utilisateur"})
                return
            }
            Ambulancier.deleteOne({_id : id})
            .then(res.status(200).json({message : "utililisateur supprimé avec succès !!!"}))
            .catch(err =>{
                console.log(err)
                res.status(400).json({message : "une erreur est survenu lors du traitement !!!"})
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "une erreur s'est produite , veuillez patienter !!!"})
        }
    }
}

module.exports = ambulancierController