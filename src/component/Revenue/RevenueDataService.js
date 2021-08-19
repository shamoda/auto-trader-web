import axios from 'axios'
import { HOST_URL } from '../../Api'

class RevenueDataService {

  revenueDetails(revenue) {
    return axios.post(HOST_URL + '/api/v1/revenue', revenue);
  }


}

export default new RevenueDataService();