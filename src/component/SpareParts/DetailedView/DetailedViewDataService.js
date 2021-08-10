  
import axios from 'axios'
import { HOST_URL } from '../../../Api'

class DetailedViewDataService {

    getSpare(id){
        return axios.get(HOST_URL+`/api/v1/spare/id/${id}`);
    }

    reviewSpare(obj){
        return axios.post(HOST_URL+'/api/v1/spare/review', obj);
    }

    deleteSpare(id){
        return axios.delete(HOST_URL+`/api/v1/spare/${id}`);
    }

}

export default new DetailedViewDataService();