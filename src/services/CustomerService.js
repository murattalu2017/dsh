import axios from 'axios'
import { JPA_API_URL } from '../Constants'

class CustomerService {

    retrieveAllCustomers(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/customers`);
    }

    retrieveAllCustomersByDate(name, year) {
        return axios.get(`${JPA_API_URL}/users/${name}/year/${year}/customers-by-date`);
    }

    retrieveCustomer(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/customer/${id}`);
    }

    deleteCustomer(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/customers/${id}`);
    }

    updateCustomer(name, id, customer) {
        return axios.put(`${JPA_API_URL}/users/${name}/update-customer/${id}`, customer);
    }

    createCustomer(name, customer) {
        return axios.post(`${JPA_API_URL}/users/${name}/register-customer`, customer);
    }

}

export default new CustomerService()