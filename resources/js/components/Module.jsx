import React, {} from 'react';
import {connect} from "react-redux";
import {setPop} from "../actions/commonActions";

const Module = ({module, setWillChangeModule, setPop}) => {
    
    const show = () => {
        setWillChangeModule(module);
        
        setPop("모듈 자세히보기");
    };
    
    return (
        <div className="module" onClick={show}>
            <div className="wrap-box-ratio">
                <div className="box-ratio">
                    <img src={module.img} alt=""/>
                </div>
            </div>
        
            <div className="module-texts">
                <p className="module-title">{module.title}</p>
            
                <div className="module-tags">
                    <span className="module-tag sub"># Swiper</span>
                    <span className="module-tag sub"># 메인</span>
                    <span className="module-tag sub"># 점보트론</span>
                    <span className="module-tag sub"># Swiper</span>
                    <span className="module-tag sub"># 메인</span>
                    <span className="module-tag sub"># 점보트론</span>
                    <span className="module-tag sub"># 점보트론</span>
                    <span className="module-tag sub"># 점보트론</span>
                </div>
            
                <p className="module-date">{module.created_at}</p>
            </div>
        </div>
    );
};

const mapDispatch = (dispatch) => {
    return {
        setPop: (data) => {
            dispatch(setPop(data))
        }
    }
};

export default connect(null, mapDispatch)(Module);
