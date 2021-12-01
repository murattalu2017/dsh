import axios from 'axios'
import { JPA_API_URL } from '../Constants'

class PromotionService {

    retrieveAllPromotions(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/promotions`);
    }

    retrievePromotion(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/promotions/${id}`);
    }

    deletePromotion(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/promotions/${id}`);
    }

    updatePromotion(name, id, promotion) {
        return axios.put(`${JPA_API_URL}/users/${name}/promotions/${id}`, promotion);
    }

    createPromotion(name, promotion) {
        return axios.post(`${JPA_API_URL}/users/${name}/register-promotion/`, promotion);
    }

}

export default new PromotionService()