import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {login, setFlash} from '../actions/commonActions';
import axios from "axios";

const Register = ({user, setFlash, history, login}) => {
    
    let phone = null;
    
    let [form, setForm] = useState({
        number: "",
        name: "",
        phone: "",
        password: "",
        password_confirmation: "",
        errors: null
    });
    let [loading, setLoading] = useState(false);
    let [mode, setMode] = useState("sendVerifyNumber");
    
    const clearError = () => {
        if (form.errors)
            setForm({
                ...form,
                errors: null
            });
    };
    
    const changeForm = (event) => {
        if (event.target.type === "checkbox") {
            const result = form[event.target.name].includes(event.target.value)
                ? form[event.target.name].filter(data => data !== event.target.value)
                : form[event.target.name].push(event.target.value);
            
            setForm({
                ...form,
                [event.target.name]: result.sort()
            });
        }
        
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };
    
    const sendVerifyNumber = (e) => {
        e.preventDefault();
        
        setLoading(true);
        
        if (form.phone)
            phone = "+82" + form.phone.replace("-", "");
        
        axios.post("/api/verifyNumber", {
                ...form,
                phone: phone
            })
            .then(response => {
                setLoading(false);
                
                setMode("checkVerifyNumber");
                
                setFlash(response.data.message);
            })
            .catch(error => {
                setLoading(false);
                
                if (error.response.status === 422)
                    return setForm({
                        ...form,
                        errors: error.response.data.errors
                    });
                
                setFlash(error.response.data.message);
            });
    };
    
    
    const checkVerifyNumber = (e) => {
        e.preventDefault();
        
        setLoading(true);
        
        if (form.phone)
            phone = "+82" + form.phone.replace("-", "");
        
        axios.patch("/api/verifyNumber", {
            ...form,
            phone: phone
        }).then(response => {
                setLoading(false);
                
                setMode("register");
                
                setFlash(response.data.message);
            })
            .catch(error => {
                setLoading(false);
                
                if (error.response.status === 422)
                    return setForm({
                        ...form,
                        errors: error.response.data.errors
                    });
                
                setFlash(error.response.data.message);
            });
    };
    
    const register = (e) => {
        e.preventDefault();
        
        setLoading(true);
        
        if (form.phone)
            phone = "+82" + form.phone.replace("-", "");
        
        axios.post("/api/auth/signup", {
            ...form,
            phone: phone
        }).then(response => {
            setLoading(false);
            
            setFlash(response.data.message);
            
            axios.get('/sanctum/csrf-cookie').then(response => {
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
                    setFlash(error.response.data.message);
                })
            });
            
        }).catch(error => {
            setLoading(false);
            
            if (error.response.status === 422)
                return setForm({
                    ...form,
                    errors: error.response.data.errors
                });
            
            setFlash(error.response.data.message);
        });
    };
    
    useEffect(() => {
        if (user)
            history.replace("/");
        
    }, []);
    
    return (
        <div id="register">
            <div className="wrap-mobile">
                <img src="/img/logo.png" alt="" className="logo"/>
                {
                    mode === "sendVerifyNumber" ? <form onSubmit={sendVerifyNumber} onKeyDown={clearError}>
                        <div className="input-text">
                            <input type="text" name="phone" placeholder="핸드폰 번호(- 제외)"
                                   onChange={changeForm}/>
                            <p className="input-error">{form.errors && form.errors.phone ? form.errors.phone : ""}</p>
                        </div>
                        
                        <button className="btn-middle btn-full bg-accent">
                            {loading
                                ? <p className="animated flash infinite">전송중</p>
                                : "인증문자 보내기"
                            }
                        </button>
                    </form> : null
                }
                
                {
                    mode === "checkVerifyNumber" ? <form onSubmit={checkVerifyNumber} onKeyDown={clearError}>
                        <div className="input-wrap">
                            <div className="input-text">
                                <input type="text" name="phone" placeholder="핸드폰 번호(- 제외)"
                                       value={form.phone} disabled/>
                            </div>
                        </div>
                        
                        <div className="input-wrap">
                            <div className="input-text">
                                <input type="text" name="number" placeholder="인증번호" onChange={changeForm}/>
                                
                                <p className="input-error">{form.errors && form.errors.number ? form.errors.number : ""}</p>
                            </div>
                        </div>
                        
                        <button className="btn-middle btn-full bg-accent">
                            {loading
                                ? <p className="animated flash infinite">인증중</p>
                                : "인증하기"
                            }
                        </button>
                    </form> : null
                }
                
                {
                    mode === "register" ? <form onSubmit={register} onKeyDown={clearError}>
                        <div className="input-wrap">
                            <div className="input-text">
                                <input type="text" name="phone" placeholder="핸드폰 번호(- 제외)"
                                       value={form.phone} disabled/>
                                
                                <p className="input-error">{form.errors && form.errors.phone ? form.errors.phone : ""}</p>
                            </div>
                        </div>
                        
                        <div className="input-wrap">
                            <div className="input-text">
                                <input type="password" name="password" placeholder="비밀번호" defaultValue=""
                                       onChange={changeForm}/>
                                
                                <p className="input-error">{form.errors && form.errors.password ? form.errors.password : ""}</p>
                            </div>
                        </div>
                        
                        <div className="input-wrap">
                            <div className="input-text">
                                <input type="password" name="password_confirmation" placeholder="비밀번호 확인"
                                       defaultValue={form.password_confirmation} onChange={changeForm}/>
                                
                                <p className="input-error">{form.errors && form.errors.password_confirmation ? form.errors.password_confirmation : ""}</p>
                            </div>
                        </div>
                        
                        <div className="input-wrap">
                            <div className="input-text">
                                <input type="text" name="name" placeholder="닉네임" onChange={changeForm}/>
                                
                                <p className="input-error">{form.errors && form.errors.name ? form.errors.name : ""}</p>
                            </div>
                        </div>
                        
                        <button className="btn-middle btn-full bg-accent">
                            {loading
                                ? <p className="animated flash infinite">진행중</p>
                                : "회원가입"
                            }
                        </button>
                    </form> : null
                }
            </div>
        </div>
    );
};
const mapState = (state) => {
    return {
        user: state.commonStates.user
    }
};

const mapDispatch = (dispatch) => {
    return {
        setFlash: (data) => {
            dispatch(setFlash(data));
        },
        
        login: (user) => {
            dispatch(login(user));
        }
    }
};
export default connect(mapState, mapDispatch)(Register);
