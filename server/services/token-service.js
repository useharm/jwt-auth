const jwt = require('jsonwebtoken');
const TokenSchema = require('../models/token-model');


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET);
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET);
        return {
            accessToken,
            refreshToken
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
}   

module.exports = new TokenService();