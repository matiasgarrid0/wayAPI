const userSchema = require('../models/users');
const db = require('../utils/mongo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
db();

module.exports = {
    login: async (user,password) => {
        if(!user || !password){
            throw new Error('Missing credentials');
        }
        const userLoged = await userSchema.findOne({user});
        if(!userLoged){
            throw new Error('User not found');
        }
        if(!bcrypt.compare(password,userLoged.password)){
            throw new Error('invalid password');
        }
        
        const payload = {
            role: userLoged.role,
            id: userLoged._id,
            user: userLoged.user,
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET);
        return token;
    },
    validate: (token) => {
        try {
            return jwt.verify(token,process.env.JWT_SECRET);
        } catch (err) {
            throw new Error(err);
        }
    }
}