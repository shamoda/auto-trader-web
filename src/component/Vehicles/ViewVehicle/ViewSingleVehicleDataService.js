import axios from 'axios'
import { HOST_URL } from '../../../Api'

class SingleVehicleViewDataService {

    getVehicle(id){
        return axios.get(HOST_URL+`/api/v1/vehicle/id/${id}`);
    }
    reviewVehicle(object){
        return axios.post(HOST_URL+'/api/v1/vehicle/review', object);
    }
    deleteVehicle(id){
        return axios.delete(HOST_URL+`/api/v1/vehicle/${id}`);
    }
}

export default new SingleVehicleViewDataService();
