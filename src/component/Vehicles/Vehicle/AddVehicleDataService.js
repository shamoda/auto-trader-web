import axios from 'axios'
import { HOST_URL } from '../../../Api'

class AddVehicleDataService {

    addVehicle(vehicle){
        return axios.post(HOST_URL+'/api/v1/vehicle', vehicle);
    }

    updateVehicle(vehicle){
        return axios.put(HOST_URL+'/api/v1/vehicle', vehicle);
    }

    getVehicle(id){
        return axios.get(HOST_URL+`/api/v1/vehicle/id/${id}`);
    }

    deleteVehicle(id){
        return axios.delete(HOST_URL+`/api/v1/vehicle/${id}`);
    }
}

export default new AddVehicleDataService();
