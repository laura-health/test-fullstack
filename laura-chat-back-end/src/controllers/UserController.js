const User = require('../models/User');
const RoomController = require('./RoomController');
const uuidv4 = require('uuid/v4');

module.exports = {
    async login(request,response) {
        const {login,password} = request.body;
        const user = await User.findOne({login,password});
        if(user) {
            return response.status(200).send({user});
        } else {
            return response.status(401).send("Erro ao logar");
        }
    },
    async createUser(request,response) {
        const {name,login,password,user_type} = request.body;
        const userFind = await User.findOne({login});
        if(!userFind) {
            let imageFile = request.files.file;
            let file_uid = `${uuidv4()}.jpg`;
            let imageURL = `${__dirname}/../public/avatars/${file_uid}`;
            //HEROKU NÃO SUPORTA UPLOAD DE ARQUIVOS
         /*   imageFile.mv(imageURL, function(err) {
                if (err) {
                    return response.status(500).send(err);
                }        
            });    */        
            const user = await User.create({
                name,
                login,
                password,
                user_type,
                avatar_url:`${process.env.APP_URL}/public/avatars/${file_uid}`
            });
            return response.send({success:true,user});
        } else {
            return response.send({success:false,message:"Usuário já cadastrado"});
        }
    },
    async getUser(request,response){
        const {user_id} = request.params;
        const user = await User.findOne({_id:user_id});
        if(user) {
            return response.send(user);
        } else {
            return response.send("Usuário não encontrado");
        }
    },

    async editUser(request,response){
        const {user_id} = request.params;
        const user = await User.findOne({_id:user_id});
        if(user) {
            return response.send(user);
        } else {
            return response.send("Usuário não encontrado");
        }
    }
};