const jwt = require('jsonwebtoken');
const TokenSchema = require('../models/token-model');


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: '30s'});
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }
    validateAccess(accessToken) {
        try {
            const userData = jwt.verify(accessToken, process.env.ACCESS_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }
    validateRefresh(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }
    async saveTokens(refreshToken, userId) {
        const tokenData = await TokenSchema.findOne({id: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            tokenData.save();
            return tokenData;
        }
        const token = await TokenSchema.create({refreshToken, id: userId});
        return token;
    }
    async removeToken(refreshToken) {
        const removeData = await TokenSchema.deleteOne({refreshToken});
        return removeData;
    }
    async findToken(refreshToken) {
        const tokenData = await TokenSchema.findOne({refreshToken});
        return tokenData;
    }
}   

module.exports = new TokenService();