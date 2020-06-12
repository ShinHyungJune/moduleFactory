import React, {useState, useEffect} from 'react';
import NewForm from './common/NewForm';
import Pop from './common/Pop';
import {setPop} from "../actions/commonActions";

const EditModule = ({module, onThen}) => {
    let [defaultForm, setDefaultForm] = useState({});
    
    useEffect(() => {
        setDefaultForm(module);
    }, [module]);
    
    return (
        <div className="create-module">
            <Pop name="모듈 자세히보기" buttons={[]}>
                {module ?
                    <NewForm method={"patch"} url={"/api/modules/" + module.id} defaultForm={defaultForm} onThen={onThen} enterSubmitDisabled={true}>
                        <input type="text" title="제목" name="title"/>
        
                        <textarea title="내용" name="body">
                    </textarea>
        
                        <input type="img" title="대표 이미지" name="img" accept={"image/*"}/>
        
                        <input type="checkbox" name="태그" title="태그"/>
        
                        <input type="codeEditor" title="코드"/>
        
                        <button type="submit" className="pop-btn">수정</button>
                    </NewForm>
                : null}
            </Pop>
        </div>
    );
};

export default EditModule;
