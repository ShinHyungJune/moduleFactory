import axios from 'axios';
import {getLocalToken, getLocalUser} from "./auth";
import {logout} from "../actions/commonActions";
import store from '../store';

const token = getLocalToken();

const {dispatch} = store;

export default function setup() {
    axios.interceptors.request.use((config) => {

        if(token) {
            config.headers.Authorization = `${token.token_type} ${token.access_token}`;
        }

        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    
    axios.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        if(error.response.data.message !== undefined){
            if(error.response.data.message.includes('Unauthenticated')) {
                dispatch(logout());
                
                window.location.replace('/login');
            }
            
            // 토큰만료시 로그아웃
            if(error.response.data.message === 'Token is Expired') {
                dispatch(logout());
    
                window.location.replace('/login');
            }
        }
        
        
        
        return Promise.reject(error);
    });
}
