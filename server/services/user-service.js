const UserSchema = require('../models/user-model');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const UserDto = require('../dtos/user-dto');
const TokenService = require('./token-service');


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
        const tokens = TokenService.generateTokens(payload);
        await TokenService.saveTokens(tokens.refreshToken, user.id)
        return {
            user,
            ...tokens
        };
    }
    async login(email, password) {
        const candidate = await UserSchema.findOne({email});
        if (!candidate) {
            throw new Error('Пользователя с такой почтой не существует');
        }
        const isEqualHashed = await bcrypt.compare(password, candidate.password);
        if (!isEqualHashed) {
            throw new Error('Неверный пароль')
        }
        const user = new UserDto({...userData});
        const tokens = TokenService.generateTokens(payload);
        await TokenService.saveTokens(tokens.refreshToken, user.id)
        return {
            user,
            ...tokens
        };
    }
    async logout(refreshToken) {
        const removeData = await TokenService.removeToken(refreshToken);
        return removeData;
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error('Пользователь не авторизован')
        }
        const isValid = TokenService.validateRefresh(refreshToken);
        if (!isValid) {
            throw new Error('Пользователь не авторизован')
        }
        const tokenData = await TokenService.findToken(refreshToken);
        if (!tokenData) {
            throw new Error('Пользователь не авторизован');
        }
        const userData = await UserSchema.findById(isValid.id);
        const user = new UserDto({...userData});
        const tokens = TokenService.generateTokens(payload);
        await TokenService.saveTokens(tokens.refreshToken, user.id);
        return {
            user,
            ...tokens
        };
    }
    async activate() {
        
    }
    async getUsers() {
        
    }
}

module.exports = new UserService();