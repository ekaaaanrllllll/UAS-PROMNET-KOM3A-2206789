import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:9080/items";

class UserService {

    GetItems(){
        return axios.get(USER_API_BASE_URL);
    }

    CreateItem(user){
        return axios.post(USER_API_BASE_URL, user);
    }

    GetItem(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    UpdateItem(user, userId){
        return axios.put(USER_API_BASE_URL + '/' + userId, user);
    }

    DeleteItem(userId){
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }
}

export default new UserService()