
import axios from 'axios'
import { HOST_URL } from '../../../Api'

class SellerVehicleListDataService {

    getVehicles(example){
        return axios.post(HOST_URL+'/api/v1/vehicle/filter', example);
    }

}

export default new SellerVehicleListDataService();
