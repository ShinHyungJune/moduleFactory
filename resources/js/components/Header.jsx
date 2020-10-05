import React, {Fragment, useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import {setFlash, logout} from "../actions/commonActions";

const Header = ({setFlash, logout, user, scrollActive}) => {
    
    let links = [
        {
            title: "프로젝트",
            to: "/projects",
            icon: "/img/server--primary.png"
        },
        {
            title: "모듈",
            to: "/modules",
            icon: "/img/box--primary.png"
        },
        {
            title: "이미지",
            to: "/images",
            icon: "/img/image--primary.png"
        }
    ];
    
    return (
        <header className={`header`}>
            <img src="/img/logo.png" alt="" className="logo"/>
            
            <div className="utils">
                {links.map((link, index) =>
                    <Link className="util" to={link.to} key={index}>
                        <div className="wrap-img">
                            <img src={link.icon} alt=""/>
                        </div>
                        
                        <span className="text">{link.title}</span>
                    </Link>
                )}
                
                <button type="button" className="util bottom" onClick={logout}>
                    <div className="wrap-img">
                        <img src="/img/userMinus--primary.png" alt=""/>
                    </div>
                    
                    <span className="text">로그아웃</span>
                </button>
            </div>
        
        </header>
    
    );
};
const mapState = (state) => {
    return {
        user: state.commonStates.user,
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
