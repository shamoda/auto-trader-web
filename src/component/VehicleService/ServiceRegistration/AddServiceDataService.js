import axios from 'axios';

class AddServiceDataService {
  //Register a workshop
  registerService(service) {
    return axios.post('http://localhost:8080/api/v1/services', service);
  }
}
export default new AddServiceDataService();
