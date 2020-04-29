import React, {useEffect, useState, Fragment} from 'react';
import {setFlash} from "../../actions/commonActions";
import {connect} from "react-redux";

const Form = ({children, url = "", method = "", onThen = (response) => {}, onCatch = (error) => {}, defaultForm = null, setFlash}) => {
    let [form, setForm] = useState({
        errors: {}
    });
    
    let loading = false;
    
    const submit = (e) => {
        e.preventDefault();
        
        if(loading)
            return;
        
        loading = true;
        
        let formData = new FormData();
    
        Object.entries(form).map(item => {
            formData.append(item[0], item[1]);
        });
        
        axios[method](url, formData).then(response => {
            onThen(response.data);
            
            setFlash(response.data.message);
            
            loading = false;
        }).catch(error => {
            onCatch(error.response.data);
            
            if(error.response.status === 422)
                return setForm({
                    ...form,
                    errors: error.response.data.errors
                });
            
            setFlash(error.response.data.message);
            
            loading = false;
        });
        
    };
    
    const clearError = () => {
        setForm({
            ...form,
            errors: {}
        })
    };
    
    const changeForm = (event) => {
        // 체크박스
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
    
        // 파일
        if(event.target.type === "file"){
            let file = event.target.files[0];
            
            // 이미지 파일이라면 썸네일 url 붙여주기
            if(file.type.includes("image"))
                file.thumbnail = URL.createObjectURL(file);
            
            return setForm({
                ...form,
                [event.target.name]: file
            });
        }
        
        setForm({
            ...form,
            [event.target.name] : event.target.value
        });
    };
    
    useEffect(() => {
        if(defaultForm){
            setForm({
                ...defaultForm,
                errors: {}
            })
        }
    }, [defaultForm]);
    
    const mergeOnChange = (el, event) => {
        el.props.onChange(event);
        
        changeForm(event);
    };
    
    return (
        <form onSubmit={submit} onKeyDown={clearError}>
            {
                React.Children.map(children, el => {

                    return el.type === "input" || el.type === "select" || el.type === "textarea"
                        ?
                        (
                            <div className="input-wrap">
                                {/* input label */}
                                {el.props.title ? React.createElement('p', {className: "input-title"}, el.props.title) : null}
                                
                                <div className={el.props.className ? el.props.className :`input-${el.props.type ? el.props.type : el.type}`}>
                                    {el.props.type === "file" ? <label htmlFor={el.props.name}>파일 선택</label> : null}
                                    
                                    {
                                        el.props.type === "file"
                                            ? (
                                                form[el.props.name]
                                                    ? (
                                                        <Fragment>
                                                            {/* file name */}
                                                            <div className="input-file-name">{form[el.props.name].name}</div>
                    
                                                            {/* file img */}
                                                            {form[el.props.name].type.includes("image")
                                                                ? <img className="input-file-img" src={form[el.props.name].thumbnail} />
                                                                : null}
                                                        </Fragment>
                                                    ) : null
                                            ) : null
                                    }
                                    
                                    {React.cloneElement(el, {
                                        onChange: (event) => {el.props.onChange ? mergeOnChange(el, event) : changeForm(event); },
                                        value: form[el.props.name]
                                            ? (el.props.type === "file") ? "" : form[el.props.name]
                                            : "",
                                        id: el.props.name
                                    })}
                                </div>
                                
                                {React.createElement('p', {className: "input-error"}, form.errors[el.props.name])}
                            </div>
                        ) : (el)
                })
            }
        </form>
    );
};

const mapDIspatch = (dispatch) => {
    return {
        setFlash: (data) => {
            dispatch(setFlash(data));
        }
    }
};

export default connect(null, mapDIspatch)(Form);
