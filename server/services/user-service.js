const UserSchema = require('../models/user-model');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const UserDto = require('../dtos/user-dto');
const TokenService = require('./token-service');
const MailService = require('./mail-service');
const ApiError = require('../exceptions/api-errors');


class UserService {
    async registration(email, password) {
        const candidate = await UserSchema.findOne({email});
        if (candidate) {
            throw ApiError.BadRequestError(`Пользователь с таким адресом ${email} уже существует`);
        }
        const activationLink = uuid.v4();
        const hashedPassword = await bcrypt.hash(password, 3);
        const userData = await UserSchema.create({email, password: hashedPassword, activationLink});
        await MailService.sendMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
        const user = new UserDto(userData);
        const tokens = TokenService.generateTokens({...user});
        await TokenService.saveTokens(tokens.refreshToken, user.id)
        return {
            user,
            ...tokens
        };
    }
    async login(email, password) {
        const candidate = await UserSchema.findOne({email});
        if (!candidate) {
            throw ApiError.BadRequestError(`Пользователя с такой почтой ${email} не существует`);
        }
        const isEqualHashed = await bcrypt.compare(password, candidate.password);
        if (!isEqualHashed) {
            throw ApiError.BadRequestError('Неверный пароль')
        }
        const user = new UserDto(candidate);
        const tokens = TokenService.generateTokens({...user});
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
            throw ApiError.UnauthorizedError();
        }
        const isValid = TokenService.validateRefresh(refreshToken);
        if (!isValid) {
            throw ApiError.UnauthorizedError();;
        }
        const tokenData = await TokenService.findToken(refreshToken);
        if (!tokenData) {
            throw ApiError.UnauthorizedError();
        }
        const userData = await UserSchema.findById(isValid.id);
        const user = new UserDto(userData);
        const tokens = TokenService.generateTokens({...user});
        await TokenService.saveTokens(tokens.refreshToken, user.id);
        return {
            user,
            ...tokens
        };
    }
    async activate(activationLink) {
        const userData = await UserSchema.findOne({activationLink});
        if (!userData) {
            throw ApiError.BadRequestError('Неверная ссылка активации')
        }
        userData.isActivated = true;
        await userData.save();
    }
    async getUsers() {
        const users = await UserSchema.find();
        return users;
    }
}

module.exports = new UserService();