import React, {useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from "../../actions/commonActions";

const AuthRoute = ({location, user, token, logout, ...rest}) => {
    // ...rest는 props 기타등등 이라는 뜻
    // location은 라우터의 현재 위치
    useEffect(() => {
        if(token){
            if(Date.now() >= Date.parse(token.expires_at))
                logout();
        }
    }, []);
    
    return user ? <Route {...rest}/> : <Redirect to={{pathname:"/login", state: {from:location}}} />;
    // to={{state:{from:location}}}으로 전달해준 from은 해당 페이지의 location.state로 확인 가능
};

const mapState = (state) => {
    return {
        user: state.commonStates.user,
        token: state.commonStates.token
    }
};

const mapDispatch = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout())
        }
    }
};

export default connect(mapState, mapDispatch)(AuthRoute);
