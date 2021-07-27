import axios from 'axios';

class ServiceDataService {
  //Register a workshop
  getService(service) {
    return axios.post('http://localhost:8080/api/v1/services/search', service);
  }
}
export default new ServiceDataService();
