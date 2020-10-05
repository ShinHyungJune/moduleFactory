import axios from 'axios';
import {getLocalToken, getLocalUser} from "./auth";
import {logout} from "../actions/commonActions";
import store from '../store';

const token = getLocalToken();

const {dispatch} = store;

export const setUp = () => {
    // 요청 보낼 때
    axios.interceptors.request.use((config) => {
        const token = getLocalToken();
        
        if (token)
            config.headers.Authorization = `${token.token_type} ${token.access_token}`;
        
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    
    // 응답 받을 때
    axios.interceptors.response.use((response) => {
        return response;
    }, error => {
        console.log(error);
        if (error.response && error.response.status === 401)
            store.dispatch(logout());
        
        return Promise.reject(error);
    });
};
