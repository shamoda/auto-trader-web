import axios from 'axios'
import { HOST_URL } from '../../../Api'

class AddSparePartDataService {

    addSparePart(sparePart){
        return axios.post(HOST_URL+'/api/v1/spare', sparePart);
    }

    updateSparePart(sparePart){
        return axios.put(HOST_URL+'/api/v1/spare', sparePart);
    }

    getSparePart(id){
        return axios.get(HOST_URL+`/api/v1/spare/id/${id}`);
    }

    deleteSparePart(id){
        return axios.delete(HOST_URL+`/api/v1/spare/${id}`);
    }

}

export default new AddSparePartDataService();