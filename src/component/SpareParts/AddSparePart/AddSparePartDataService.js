import axios from 'axios'
import { HOST_URL } from '../../../Api'

class AddSparePartDataService {

    addSparePart(sparePart){
        return axios.post(HOST_URL+'/api/v1/spare', sparePart);
    }

}

export default new AddSparePartDataService();