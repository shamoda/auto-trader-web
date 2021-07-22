import axios from 'axios'
import { HOST_URL } from '../Api'

class AthenticationDataService {

    login(email) {
        // let basicAuthHeader = 'Basic ' + window.btoa(email + ":" + password);
        return axios.get(HOST_URL+`/api/v1/user/login/${email}`);
    }

}

export default new AthenticationDataService();