import React, {useEffect, useState} from 'react';
import Form from '../../components/common/Form';

const Edit = ({history, match}) => {
    let [item, setItem] = useState({});
    
    useEffect(() => {
        axios.get("/api/modules/" + match.params.id)
            .then(response => {
                setItem(response.data);
            })
    },[]);
    
    return (
        <div className="wrap-form">
            {item ?
                <Form method={"patch"} url={"/api/modules/" + item.id} onThen={(response) => {window.setFlash(response.data.message); history.replace("/modules");}} defaultForm={item}>
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
                </Form> : null
            }
        </div>
    );
};


export default Edit;
