import axios from 'axios'
import { JPA_API_URL } from '../../Constants'

class PromotionDataService {

    retrieveAllPromotions(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/promotions`);
    }

    retrievePromotion(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/promotions/${id}`);
    }

    deletePromotion(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/promotions/${id}`);
    }

    updatePromotion(name, id, todo) {
        return axios.put(`${JPA_API_URL}/users/${name}/promotions/${id}`, todo);
    }

    createPromotion(name, todo) {
        return axios.post(`${JPA_API_URL}/users/${name}/promotions/`, todo);
    }

}

export default new PromotionDataService()