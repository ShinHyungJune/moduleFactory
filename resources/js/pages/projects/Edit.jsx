import React, {useEffect, useState} from 'react';
import Form from '../../components/common/Form';

const Edit = ({history, match}) => {
    let [item, setItem] = useState({});
    
    useEffect(() => {
        axios.get("/api/projects/" + match.params.id)
            .then(response => {
                setItem(response.data);
            })
    },[]);
    
    return (
        <div className="wrap-form">
            {item ?
                <Form method={"patch"} url={"/api/projects/" + item.id} onThen={(response) => {window.setFlash(response.data.message); history.replace("/projects");}} defaultForm={item}>
                    <input type="img" title={"대표 이미지"} name={"img"}/>
                    <input type="text" title={"제목"} name={"title"}/>
                    <textarea title={"설명"} name={"body"}></textarea>
                    <textarea title={"기본 CSS"} name={"css"} placeholder={"모든 모듈에 공통적으로 적용될 CSS를 입력해주세요. ex) reset.css, default.css"}></textarea>
                    <textarea title={"기본 JS"} name={"js"} placeholder="모든 모듈에 공통적으로 적용될 JS를 입력해주세요. ex) jquery"></textarea>
        
                    <div className="btns">
                        <button className="btn type01">확인</button>
                        <button type="button" className="btn type01 type-gray" onClick={() => history.goBack()}>취소</button>
                    </div>
                </Form> : null
            }
        </div>
    );
};


export default Edit;
