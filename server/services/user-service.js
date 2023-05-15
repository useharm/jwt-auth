const UserSchema = require('../models/user-model');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const UserDto = require('../dtos/user-dto');


class UserService {
    async registration(email, password) {
        const candidate = await UserSchema.findOne({email});
        if (candidate) {
            throw new Error('Пользователь с таким адресом уже существует');
        }
        const activationLink = uuid.v4();
        const hashedPassword = await bcrypt.hash(password, 3);
        const userData = await UserSchema.create({email, password: hashedPassword, activationLink});
        const user = new UserDto({...userData});
        return user;
    }
    async login(email, password) {
        
    }
    async logout() {
        
    }
    async refresh() {
        
    }
    async activate() {
        
    }
    async getUsers() {
        
    }
}

module.exports = new UserService();