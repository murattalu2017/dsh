import axios from 'axios'
import { JPA_API_URL } from '../Constants'

class ProfileService {
	
	retrieveAllProfiles(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/profiles`);
    }

    generateProfile(name, customer) {
        return axios.post(`${JPA_API_URL}/users/${name}/generate-profile`, customer);
    }

}

export default new ProfileService()