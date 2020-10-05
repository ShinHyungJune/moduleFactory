import React, {} from 'react';
import {connect} from "react-redux";
import Form from '../../components/common/Form';

const Create = ({history}) => {
    
    return (
        <div className="wrap-form">
            <Form method={"post"} url={"/api/projects"} onThen={(response) => {window.setFlash(response.data.message); history.replace("/projects");}}>
                <input type="img" title={"대표 이미지"} name={"img"}/>
                <input type="text" title={"제목"} name={"title"}/>
                <textarea title={"설명"} name={"body"}></textarea>
                <textarea title={"기본 CSS"} name={"css"} placeholder={"모든 모듈에 공통적으로 적용될 CSS를 입력해주세요. ex) reset.css, default.css"}></textarea>
                <textarea title={"기본 JS"} name={"js"} placeholder="모든 모듈에 공통적으로 적용될 JS를 입력해주세요. ex) jquery"></textarea>
                
                <div className="btns">
                    <button className="btn type01">확인</button>
                    <button type="button" className="btn type01 type-gray" onClick={() => history.goBack()}>취소</button>
                </div>
            </Form>
        </div>
    );
};


export default Create;
