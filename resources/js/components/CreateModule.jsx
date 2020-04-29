import React, {useState, useEffect} from 'react';
import NewForm from './common/NewForm';
import Pop from './common/Pop';

const CreateModule = ({willChangeModule}) => {
    let [defaultForm, setDefaultForm] = useState({});
    
    useEffect(() => {
        if(willChangeModule)
            setDefaultForm(willChangeModule);
            
    }, [willChangeModule]);
    
    return (
        <div className="create-module">
            <Pop name="모듈 자세히보기" buttons={[]}>
                <NewForm method="post" url="/api/modules" defaultForm={defaultForm}>
                    <input type="text" title="제목" name="title"/>
        
                    <textarea title="내용" name="body">
                    </textarea>
        
                    <input type="file" title="대표 이미지" name="img"/>
        
                    <input type="checkbox" name="태그" title="태그"/>
        
                    <input type="codeEditor" title="코드"/>
    
                    <button type="submit" className="pop-btn">제출</button>
                </NewForm>
            </Pop>
        </div>
    );
};

export default CreateModule;
