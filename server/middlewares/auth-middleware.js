const tokenService = require("../services/token-service");
const ApiError = require('../exceptions/api-errors');

module.exports = function AuthMiddleware(req, res, next) {
    try {
        const authData = req.headers.authorization;
        if (!authData) {
            throw ApiError.UnauthorizedError();
        }
        const accessToken = authData.split(' ')[1];
        if (!accessToken) {
            throw ApiError.UnauthorizedError();
        }
        const user = tokenService.validateAccess(accessToken);
        if (!user) {
            throw ApiError.UnauthorizedError();
        }
        req.user = user; 
        next();
    } catch (error) {
        next(error)
    }
}