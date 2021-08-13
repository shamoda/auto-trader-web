import userEvent from "@testing-library/user-event";
import axios from "axios";
import { HOST_URL } from "../../Api";


class UserRegistrationDataService{
  registerUser(user){
    return axios.post(HOST_URL+'/api/v1/user', user);
  }

}

export default new UserRegistrationDataService();