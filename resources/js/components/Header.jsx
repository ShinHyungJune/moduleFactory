import React, {Fragment, useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import {setFlash, logout} from "../actions/commonActions";

const Header = ({setFlash, logout, user, scrollActive}) => {

    let [opened, setOpened] = useState(false);

    let location = useLocation();

    let hideUrlList = ["/login", "/sendResetPasswordMail", "/register", "/passwordReset"];

    let [hide, setHide] = useState(hideUrlList.includes(location.pathname));

    let toggleMenu = () => {
        setOpened(!opened);
    };

    useEffect(() => {
        setHide(hideUrlList.includes(location.pathname));
    }, [location]);

    return (
        <Fragment>
            {hide ? null :
                <header className={`bg-primary ${scrollActive ? "active" : ""}`}>
                    <div className="header-top">
                        <img src="/img/logo.png" alt="" className="logo"/>
            
                        <button type="button" className="btn bg-white primary" onClick={logout}>LOGOUT</button>
                    </div>
                    <div className="header-bottom">
                        <div className="navigations">
                            <Link className="navigation active" to="/modules">
                                <div className="wrap-img">
                                    <img src="/img/icon_archive_white.png" alt=""/>
                                </div>
                    
                                <span className="text">모듈 목록</span>
                            </Link>
                
                            <Link className="navigation" to="/modules">
                                <div className="wrap-img">
                                    <img src="/img/icon_code_white.png" alt=""/>
                                </div>
                    
                                <span className="text">전체 적용 CSS 설정</span>
                            </Link>
                        </div>
                    </div>
                </header>
            }
        </Fragment>

    );
};
const mapState = (state) => {
    return {
        user: state.commonStates.user,
        scrollActive: state.commonStates.scrollActive
    }
};

const mapDispatch = (dispatch) => {
    return {
        setFlash: (data) => {
            dispatch(setFlash(data));
        },

        logout: (data) => {
            dispatch(logout(data));
        }
    }
};
export default connect(mapState, mapDispatch)(Header);
