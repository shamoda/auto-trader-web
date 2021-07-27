import axios from 'axios';

class ServiceDataService {
  //Register a workshop
  getService(service) {
    return axios.post('http://localhost:8080/api/v1/services/search', service);
  }

  getServiceById(id) {
    return axios.get(`http://localhost:8080/api/v1/services/${id}`);
  }
}
export default new ServiceDataService();
