import React, {useEffect, useState} from 'react';
import {setFlash} from "../../actions/commonActions";
import {connect} from "react-redux";
import InputText from "./inputs/InputText";
import InputCheckbox from './inputs/InputCheckbox';
import InputSelect from './inputs/InputSelect';
import InputTextarea from './inputs/InputTextarea';
import InputFile from './inputs/InputFile';
import InputImage from './inputs/InputImage';
import InputCodeEditor from './inputs/InputCodeEditor';
import InputTags from "./inputs/InputTags";

const Form = ({children, url = "", method = "", onThen = (response) => {}, onCatch = (error) => {}, defaultForm = null, setFlash, enterSubmitDisabled = false}) => {
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
        
        if(method === "patch" || method === "PATCH" || method === "put" || method === "PUT") {
            method = "post"; // patch, put multipart form 쓰면 데이터가 안날아가 그래서 post로 날리고 _method를 설정해주는식으로 해야돼
            
            formData.append("_method","patch");
        }
        
        axios[method](url, formData).then(response => {
            onThen(response.data);
            
            setFlash(response.data.message);
            
            setForm({errors: {}});
            
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
    
    useEffect(() => {
        if(defaultForm)
            setForm({
                ...defaultForm,
                errors: {}
            });
    }, [defaultForm]);
    
    /*const mergeOnChange = (el, event) => {
        el.props.onChange(event);
        
        changeForm(event);
    };*/
    
    return enterSubmitDisabled ?
        (<div onSubmit={submit} onKeyDown={clearError}>
            {
                React.Children.map(children, el => {
                    return el.type === "input" || el.type === "select" || el.type === "textarea"
                        ?
                        (
                            <div className="input-wrap">
                                {/* label */}
                                {el.props.title ? React.createElement('p', {className: "input-title"}, el.props.title) : null}
                            
                                {/* input text */}
                                {el.type === "input" && el.props.type === "text" ? <InputText form={form} setForm={setForm} el={el}/> : null}
                            
                                {/* input checkbox */}
                                {el.type === "input" && el.props.type === "checkbox" ? <InputCheckbox form={form} setForm={setForm} el={el}/> : null}
                            
                                {/* input tags */}
                                {el.type === "input" && el.props.type === "tags" ? <InputTags form={form} setForm={setForm} el={el}/> : null}
                            
                                {/* input img */}
                                {el.props.type === "img" ? <InputImage form={form} setForm={setForm} el={el}/> : null}
                            
                                {/* input file */}
                                {el.props.type === "file" ? <InputFile form={form} setForm={setForm} el={el}/> : null}
                            
                                {/* textarea */}
                                {el.type === "textarea" ? <InputTextarea form={form} setForm={setForm} el={el}/> : null}
                            
                                {/* select */}
                                {el.type === "select" ? <InputSelect form={form} setForm={setForm} el={el}/> : null}
                            
                                {/* codeEditor */}
                                {el.props.type === "codeEditor" ? <InputCodeEditor defaultForm={defaultForm} form={form} setForm={setForm} el={el}/> : null}
                            
                                {React.createElement('p', {className: "input-error"}, form.errors[el.props.name])}
                            </div>
                        ) : (el)
                })
            }
        </div>)
        :
        (<form onSubmit={submit} onKeyDown={clearError}>
            {
                React.Children.map(children, el => {
                    return el.type === "input" || el.type === "select" || el.type === "textarea"
                        ?
                        (
                            <div className="input-wrap">
                                {/* label */}
                                {el.props.title ? React.createElement('p', {className: "input-title"}, el.props.title) : null}
                            
                                {/* input text */}
                                {el.type === "input" && el.props.type === "text" ? <InputText form={form} setForm={setForm} el={el}/> : null}
                            
                                {/* input checkbox */}
                                {el.type === "input" && el.props.type === "checkbox" ? <InputCheckbox form={form} setForm={setForm} el={el}/> : null}
                            
                                {/* input tags */}
                                {el.type === "input" && el.props.type === "tags" ? <InputTags form={form} setForm={setForm} el={el}/> : null}
                            
                                {/* input img */}
                                {el.props.type === "img" ? <InputImage form={form} setForm={setForm} el={el}/> : null}
                            
                                {/* input file */}
                                {el.props.type === "file" ? <InputFile form={form} setForm={setForm} el={el}/> : null}
                            
                                {/* textarea */}
                                {el.type === "textarea" ? <InputTextarea form={form} setForm={setForm} el={el}/> : null}
                            
                                {/* select */}
                                {el.type === "select" ? <InputSelect form={form} setForm={setForm} el={el}/> : null}
                            
                                {/* codeEditor */}
                                {el.props.type === "codeEditor" ? <InputCodeEditor defaultForm={defaultForm} form={form} setForm={setForm} el={el}/> : null}
                            
                                {React.createElement('p', {className: "input-error"}, form.errors[el.props.name])}
                            </div>
                        ) : (el)
                })
            }
        </form>);
};

const mapDIspatch = (dispatch) => {
    return {
        setFlash: (data) => {
            dispatch(setFlash(data));
        }
    }
};

export default connect(null, mapDIspatch)(Form);
