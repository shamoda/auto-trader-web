import axios from 'axios';
import { HOST_URL } from '../../../Api';

class HomeServicesDataService {
  getServicesData(example) {
    return axios.post('http://localhost:8080/api/v1/services/search', example);
  }
}

export default new HomeServicesDataService();
