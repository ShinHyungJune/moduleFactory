import React, {} from 'react';
import {connect} from "react-redux";
import Form from '../../components/common/Form';

const Create = ({history, match}) => {
    
    return (
        <div className="wrap-form">
            <Form method={"post"} url={"/api/modules"} defaultForm={{project_id: match.params.project_id}} onThen={(response) => {window.setFlash(response.data.message); history.replace("/projects/" + match.params.project_id);}}>
                <input type="img" title={"대표 이미지"} name={"img"}/>
                <input type="text" title={"제목"} name={"title"}/>
                <textarea title={"설명"} name={"body"}></textarea>
                <input type="tags" name={"tags"} title={"태그"}/>
                <textarea title={"CSS"} name={"css"} placeholder={""}></textarea>
                <textarea title={"JS"} name={"js"} placeholder=""></textarea>
                
                <div className="btns">
                    <button className="btn type01">확인</button>
                    <button type="button" className="btn type01 type-gray" onClick={() => history.goBack()}>취소</button>
                </div>
            </Form>
        </div>
    );
};


export default Create;
