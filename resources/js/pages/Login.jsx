import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {login, setFlash} from '../actions/commonActions';
import Form from '../components/common/Form';
import axios from "axios";

const Login = ({login, setFlash, user, location, history}) => {
    useEffect(() => {
        if(user)
            return history.replace("/");
    }, []);
    
    let [form, setForm] = useState({
        "phone": "",
        "password": "",
        errors: null
    });
    
    const changeForm = (event) => {
        if(event.target.type === "checkbox"){
            form[event.target.name].includes(event.target.value)
                ? form[event.target.name] = form[event.target.name].filter(data => data !== event.target.value)
                : form[event.target.name].push(event.target.value);
            
            form[event.target.name].sort();
            
            return setForm({
                ...form,
                [event.target.name]: form[event.target.name]
            });
        }
        
        setForm({
            ...form,
            [event.target.name] : event.target.value
        });
    };
    
    const submit = (e) => {
        e.preventDefault();
        
        axios.get('/sanctum/csrf-cookie').then(response => {
            let phone = null;
            
            if(form.phone)
                phone = "+82" + form.phone.replace("-", "");
            
            axios.post("/login", {
                ...form,
                phone: phone
            }).then(response => {
                axios.get("/api/user")
                    .then(response => {
                        login(response.data);
                        
                        history.push("/");
                    })
            }).catch(error => {
                if(error.response.status === 422)
                    return setForm({
                        ...form,
                        errors: error.response.data.errors
                    });
                
                setFlash(error.response.data.message);
            })
        });
    };
    
    return (
        <div id="login">
            <div className="wrap-mobile">
                <img src="/img/logo.png" alt="" className="logo"/>
                
                <form onSubmit={submit}>
                    <div className="input-wrap">
                        <div className="input-text">
                            <input type="text" name="phone" placeholder="폰번호 아이디" onChange={changeForm}/>
                        </div>
                        
                        <p className="input-error">{form.errors && form.errors.phone ? form.errors.phone : ""}</p>
                    </div>
                    
                    <div className="input-wrap">
                        <div className="input-text">
                            <input type="password" name="password" placeholder="비밀번호" onChange={changeForm}/>
                        </div>
                        
                        <p className="input-error">{form.errors && form.errors.password ? form.errors.password : ""}</p>
                    </div>
                    
                    <div className="links align-right">
                        <Link to="/sendResetPasswordMail" className="primary">비밀번호 찾기 / </Link>
                        <Link to="/register" className="primary">회원가입</Link>
                    </div>
                    
                    <button className="btn type02 width-100">로그인</button>
                </form>
            </div>
        </div>
    );
};

const mapState = (state) => {
    return {
        user: state.commonStates.user
    }
};

const mapDIspatch = (dispatch) => {
    return {
        login: (user) => {
            dispatch(login(user));
        },
        
        setFlash: (data) => {
            dispatch(setFlash(data));
        }
    }
};

export default connect(mapState, mapDIspatch)(Login);
