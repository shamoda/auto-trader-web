import axios from 'axios'
import { HOST_URL } from '../../Api'

class RevenueDataService {

  addRevenue(revenue) {
    return axios.post(HOST_URL + '/api/v1/revenue', revenue);
  }

  getRevenue() {
    return axios.get(HOST_URL + '/api/v1/revenue');
  }

  deleteRevenue(id) {
    return axios.delete(HOST_URL + `/api/v1/revenue/${id}`)
  }


}

export default new RevenueDataService();