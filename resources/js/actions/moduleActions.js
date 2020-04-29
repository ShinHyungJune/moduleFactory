import {SET_MODULES} from "../types";

export const getModules = (params = {}) => {
    return (dispatch) => {
        axios.get("/api/modules", {
                params: params
            }).then(response => {
                dispatch({
                    type: SET_MODULES,
                    payload: response.data
                });
            });
   
    }
};


