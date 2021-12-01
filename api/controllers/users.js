const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



require('dotenv').config();

module.exports = {
    userRegister: async (req, res) => {
        try {
            let user = await User.findOne({email: req.body.email})

            if(user) {
                throw new Error('User with this email already exists!');
            }

            if (req.body.confirm_password !== req.body.password) {
                throw new Error('Password does not match!');
            }
            
            req.body.password = bcrypt.hashSync(req.body.password);
            req.body.confirm_password = bcrypt.hashSync(req.body.confirm_password);

            user = await User.create(req.body);

            res.send({
               error: false,
               message: 'New user has been created!',
               user: user
           });
        } catch (error) {
            res.send({
                error: true,
                message: error.message,
            });
        }
        
    },
    userLogin: async (req, res) => {
        try{
            const user = await User.findOne({email: req.body.email});
            if(!user) {
                throw new Error('Invalid email or password');
            }
            
            if(!bcrypt.compareSync(req.body.password, user.password)) {
                throw new Error('Invalid email or password');
            }
            
    
            const payload = {
                id: user._id,
                email: user.email
            }
    
            const token = jwt.sign(payload, process.env.AUTH_SECRET, {
                expiresIn: '60m'
            });
    
            res.send({
                error: false,
                message: 'User logged in',
                token: token
            });
    
           } catch (error) {
            res.send({
                error: true,
                message: error.message,
            });
           }
    },
    myProfile: async (req, res) => {
        try{
            const userLogged = await User.find({user: req.params.id});;

            res.send({
                error: false,
                message: 'User profile',
                userLogged: userLogged
            });
        } catch (error) {
            res.send({
                error: true,
                message: error.message
            });
        }
    },
    editMyProfile: async (req, res) => {
        try {
            req.body.user = req.user.id;
            const user = await User.findByIdAndUpdate(req.user.id, req.body);
            
            
            res.send({
                error: false,
                message: `User with id #${req.user.id} has just updated his/her profile!`,
                user: user
            });
        } catch (error) {
            res.send({
                error: true,
                message: error.message,
            });
            console.log(error);
        }
    },
    userLogout: async (req, res) => {
        try{
            const user = await User.findOne({user: req.params.id});

            const payload = {
                id: user._id,
                email: user.email
            }
            
            const token = jwt.sign(payload, 'Invalid secret key', {
                expiresIn: '1'
            });
            res.send({
                error: false,
                message: 'User logged out',
                token: token
            });
    
           } catch (error) {
            res.send({
                error: true,
                message: error.message,
            });
           }
    }
}