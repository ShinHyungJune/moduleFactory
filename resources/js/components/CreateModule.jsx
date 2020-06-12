import React, {useState, useEffect} from 'react';
import NewForm from './common/NewForm';
import Pop from './common/Pop';
import {setPop} from "../actions/commonActions";

const CreateModule = ({onThen}) => {
    
    return (
        <div className="create-module">
            <Pop name="모듈 생성" buttons={[]}>
                <NewForm method={"post"} url={"/api/modules"} onThen={onThen} enterSubmitDisabled={true}>
                    <input type="text" title="제목" name="title"/>
        
                    <textarea title="내용" name="body">
                    </textarea>
        
                    <input type="img" title="대표 이미지" name="img" accept={"image/*"}/>
    
                    <input type="tags" name="태그" title="태그"/>
    
                    <input type="codeEditor" title="코드"/>
                    
                    <button type="submit" className="pop-btn">생성</button>
                </NewForm>
            </Pop>
        </div>
    );
};

export default CreateModule;
