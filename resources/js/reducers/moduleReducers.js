import {SET_MODULES} from '../types';

const initialsState = {
    modules: {
        data: [],
        meta: null
    }
};

export default (state = initialsState, action) => {
    switch (action.type) {
        default:
            return state;

        case SET_MODULES:
            return {
                ...state,
                modules: action.payload
            };
    }
}
