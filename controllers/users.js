const db = require('../utils/mongo');
const userSchema = require('../models/users');
//import handleCookie from '../helpers/handleCookie';
// modules
const bcrypt = require('bcrypt');

db();

const Usuario = {
  async findUser(id){
    try {
      const user = await userSchema.findById({id});
      if(!user){
        throw new Error('user not found');
      }
      return user;     
    } catch (err) {
      return err;
    }
  },
  async create(data) {
    try {
      const {password} = data;
      const passwordEncoded = bcrypt.hashSync(password,10);
      const user = await userSchema.create({...data,password: passwordEncoded});
      return user;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  async deleteUser(id){
    try {
      return await userSchema.deleteOne({id});
    } catch (err) {
      console.log(err);
      return err;
    }
  }
};

module.exports =  Usuario;