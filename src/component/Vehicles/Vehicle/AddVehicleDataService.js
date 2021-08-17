import axios from 'axios'
import { HOST_URL } from '../../../Api'

class AddVehicleDataService {

    addVehicle(vehicle){
        return axios.post(HOST_URL+'/api/v1/vehicle', vehicle);
    }
}

export default new AddVehicleDataService();
