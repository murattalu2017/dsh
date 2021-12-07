import axios from 'axios'
import { JPA_API_URL } from '../Constants'

class PromotionService {

    retrieveAllPromotionEmailss(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/promotionemails`);
    }

}

export default new PromotionService()