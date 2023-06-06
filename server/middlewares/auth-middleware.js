const tokenService = require("../services/token-service");

module.exports = function AuthMiddleware(req, res, next) {
    try {
        const authData = req.headers.authorization;
        if (!authData) {
            throw new Error('Ошибка авторизации');
        }
        const accessToken = authData.split(' ')[1];
        if (!accessToken) {
            throw new Error('Ошибка авторизации');
        }
        const user = tokenService.validateAccess(accessToken);
        if (!user) {
            throw new Error('Ошибка авторизации');
        }
        req.user = user; 
        next();
    } catch (error) {
        next(error)
    }
}