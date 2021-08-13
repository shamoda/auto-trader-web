  
import axios from 'axios'
import { HOST_URL } from '../../../Api'

class SellerSparePartsListDataService {

    getSpares(example){
        return axios.post(HOST_URL+'/api/v1/spare/filter', example);
    }

}

export default new SellerSparePartsListDataService();