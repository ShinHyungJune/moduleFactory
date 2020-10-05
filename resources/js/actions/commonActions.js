import {SET_POP, SET_FLASH, SET_USER, SET_SCROLL_ACTIVE} from "../types";
import store from "../store";

export const setPop = (data) => {
    return (dispatch) => {
        
        if(data)
            document.querySelector("html").style.overflowY = "hidden";
        else
            document.querySelector("html").style.overflowY = "auto";
        
        dispatch({
            type: SET_POP,
            payload: data
        });
    }
};

export const setFlash = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_FLASH,
            payload: data
        })
    }
};

export const setScrollActive = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_SCROLL_ACTIVE,
            payload: data
        })
    }
};

export const login = (user = null) => {

    return (dispatch) => {
        dispatch({
            type: SET_USER,
            payload: user
        });

        localStorage.setItem("user", JSON.stringify(user));
    }
};

export const logout = () => {
    return (dispatch) => {
        axios.post("/logout").then(response => {
            dispatch({
                type: SET_USER,
                payload: null
            });

            localStorage.removeItem("user");
        });
    }
};
