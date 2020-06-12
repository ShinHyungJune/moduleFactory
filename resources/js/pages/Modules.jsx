import React, {useEffect, useState, Fragment} from 'react';
import {getModules} from "../actions/moduleActions";
import {connect} from "react-redux";
import Module from '../components/Module';
import CreateModule from '../components/CreateModule';
import EditModule from '../components/EditModule';
import {setPop} from "../actions/commonActions";
import {setModules} from "../actions/moduleActions";

const Modules = ({getModules, modules, scrollActive, setPop}) => {
    let params = {};
    let [willChangeModule, setWillChangeModule] = useState(null);
    
    useEffect(() => {
        if(modules.data.length === 0)
            getModules(params);
    }, []);
    
    const create = () => {
        setPop("모듈 생성");
    };
    
    const save = (response) => {
        modules.data.unshift(response);
        
        store.dispatch(setModules({
            ...modules,
            data: modules.data
        }));
        
        setPop(null);
    };
    
    const update = (response) => {
        setPop(null);
        
        store.dispatch(setModules({
            ...modules,
            data: modules.data.map(moduleData => {
                if(moduleData.id === response.data.id)
                    return response.data;
                
                return moduleData;
            })
        }));
    };
    
    const remove = () => {
        axios.delete("/api/vrs/" + vr.id)
            .then(response => {
                
                store.dispatch(setFlash(response.data.message));
                
                setVrs({
                    ...vrs,
                    data: vrs.data.filter(vrData => vrData.id !== vr.id)
                });
                
                history.push("/");
            })
    };
    
    return (
        <Fragment>
            <CreateModule onThen={save}/>
            
            <EditModule module={willChangeModule} onThen={update}/>
            
            <div className={`header-utils ${scrollActive ? "active" : ""}`}>
                <button className="header-util btn bg-sub" title="파일 다운">
                    <img src="/img/icon_down_white.png" alt=""/>
                </button>
    
                <button className="header-util btn bg-accent" title="모듈 생성" onClick={create}>
                    <img src="/img/icon_plus_white.png" alt=""/>
                </button>
            </div>
            
            <div className="page-header">
                <p className="page-header-title">모듈 목록</p>
                
                <div className="input-search">
                    <input type="text" placeholder="검색어를 입력해주세요."/>
                </div>
            </div>
            
            <div id="modules">
                {modules.data.map(module => <Module module={module} key={module.id} setWillChangeModule={setWillChangeModule}/>)}
            </div>
        </Fragment>
    );
};

const mapState = (state) => {
    return {
        modules: state.moduleStates.modules,
        scrollActive: state.commonStates.scrollActive
    }
};

const mapDispatch = (dispatch) => {
    return {
        getModules: (params) => {
            dispatch(getModules(params))
        },
        
        setPop: (data) => {
            dispatch(setPop(data))
        }
    }
};

export default connect(mapState, mapDispatch)(Modules);
