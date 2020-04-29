import React, {Fragment, useEffect, useState} from 'react';
import {setPop} from "../../actions/commonActions";
import {connect} from 'react-redux';

const Pop = ({type = "page", name = null, children, onClose = () => null, buttons = [], includeCancel = false, pop, setPop}) => {
    useEffect(() => {
        if(pop === name){
            history.pushState({page: "pop"}, document.title, location.pathname + `#${name}`);
        }

        window.addEventListener("popstate", e=> {
            setPop(null);

            onClose();
        });

    }, [pop]);
    const close = () => {
        onClose();

        setPop(null);

        history.back();
    };

    if(pop === name)
        return (
        <Fragment>
            <div className={`pop ${type === "page" ? "type-page" : "type-pop"}`}>
                <div className="pop-header">
                    <p className="pop-header-title">
                        {name}
                    </p>

                    <div className="pop-header-btn">
                        <img src="/img/icon_thin_x.png" alt="" className="only-page" onClick={close}/>
                    </div>
                </div>

                <div className="pop-contents">
                    {children}
                </div>

                <div className="pop-btns">
                    {buttons.map((button, index) =>(
                        <Fragment key={index}>
                            {button}
                        </Fragment>
                    ))}

                    {includeCancel ? <button onClick={() => setPop(null)}>취소</button> : null}
                </div>
            </div>

            <div className="black animated fadeIn"></div>
        </Fragment>
        );

    return null;
};

const mapState = (state) => {
    return {
        pop: state.commonStates.pop
    }
};

const mapDispatch = (dispatch) => {
    return {
        setPop: (data) => {
            dispatch(setPop(data));
        }
    }
};

export default connect(mapState, mapDispatch)(Pop);
