
import axios from 'axios'
import { HOST_URL } from '../../../Api'

class AdminVehicleListDataService {

    getVehicles(example){
        return axios.post(HOST_URL+'/api/v1/vehicle/filter', example);
    }

    getVehiclesReport(){
        return axios.get(HOST_URL+'/api/v1/vehicle/report');
    }

}

export default new AdminVehicleListDataService();
