import axios from 'axios';

class AddServiceDataService {
  //Register a workshop
  registerService(service) {
    return axios.post('http://localhost:8080/api/v1/services', service);
  }
  getServiceForId(Id) {
    return axios.get(`http://localhost:8080/api/v1/services/${Id}`);
  }

  updateService(id, data) {
    return axios.put(`http://localhost:8080/api/v1/services/${id}`, data);
  }

  deleteService(id) {
    return axios.delete(`http://localhost:8080/api/v1/services/${id}`);
  }
}
export default new AddServiceDataService();
