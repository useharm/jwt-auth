import $api from '../http/index';
import { inputType } from '../types/inputTypes';

class AuthService {
    static async registration({email, password}: inputType) {
        const response = await $api.post('/registration', {email,password});
        return response;
    };
    static async login({email, password}: inputType) {
        const response = await $api.post('/login', {email,password});
        return response;
    };
    static async logout() {
        const response = await $api.post('/logout');
        return response.data
    }
}

export default AuthService;