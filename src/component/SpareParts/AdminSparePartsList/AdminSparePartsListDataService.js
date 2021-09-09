  
import axios from 'axios'
import { HOST_URL } from '../../../Api'

class AdminSparePartsListDataService {

    getSpares(example){
        return axios.post(HOST_URL+'/api/v1/spare/filter', example);
    }

    getReportSpares(){
        return axios.get(HOST_URL+'/api/v1/spare/report');
    }

}

export default new AdminSparePartsListDataService();