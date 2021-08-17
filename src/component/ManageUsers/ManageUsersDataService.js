import axios from 'axios'
import { HOST_URL } from '../../Api'

class ManageUsersDateService {
  
  getUsers(example){
    return axios.post(HOST_URL+'/api/v1/user/filter', example);
  }

  deleteUser(email){
    return axios.post(HOST_URL+'/api/v1/user/${email}')
  }

  
}

export default new ManageUsersDateService();
