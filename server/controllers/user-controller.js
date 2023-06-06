const UserService = require("../services/user-service");




class UserController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            next(error)
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            next(error)
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const removeData = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(removeData);
        } catch (error) {
            next(error)
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            next(error)
        }
    }
    async activate(req, res, next) {
        try {
            const link = req.params.link;
            await UserService.activate(link);
            return res.redirect(process.env.CLIENT_URL)
        } catch (error) {
            next(error)
        }
    }
    async getUsers(req, res, next) {
        try {
             const users = await UserService.getUsers();
             return res.json(users)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController();