import axios from 'axios'
import { JPA_API_URL } from '../Constants'

class BankActivityService {

    processBankActivity(name, filename) {
        return axios.get(`${JPA_API_URL}/users/${name}/read-bank-activity-dataset/${filename}`);
    }

}

export default new BankActivityService()