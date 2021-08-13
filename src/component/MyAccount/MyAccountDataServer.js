import axios from "axios";
import { HOST_URL } from '../../Api'


class MyAccountDataService {
  updateUser(user){
    return axios.post(HOST_URL+'/api/v1/user', user);
  }

  deleteUser(id) {
    return axios.delete(HOST_URL+`/api/v1/user/${id}`);
  }
}

export default new MyAccountDataService();