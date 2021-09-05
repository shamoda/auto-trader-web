import axios from 'axios';

class ServiceDetailDataService {
  //Register a workshop
  reviewService(id, service) {
    return axios.put(
      `http://localhost:8080/api/v1/services/review/${id}`,
      service
    );
  }
  getServiceForId(Id) {
    return axios.get(`http://localhost:8080/api/v1/services/${Id}`);
  }

  deleteService(Id) {
    return axios.delete(`http://localhost:8080/api/v1/services/${Id}`);
  }
}
export default new ServiceDetailDataService();
