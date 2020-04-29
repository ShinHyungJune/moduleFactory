import React, {useState} from 'react';

const Tabs = ({children}) => {
    let [activeIndex, setActiveIndex] = useState(0);
    
    const switchTab = (index) => {
        setActiveIndex(index);
    };
    
    return (
        <div className="tabs">
            <div className="tabs-btns">
                {children.map((tab, index) => (<button type="button" key={index} className={index === activeIndex ? "tabs-btn active" : "tabs-btn"} onClick={() => switchTab(index)}>{tab.props.name}</button>))}
            </div>
            
            <div className="tabs-contents">
                {children.map((tab, index) => (<div className={index === activeIndex ? "tabs-content active" : "tabs-content"} key={index}>{tab.props.children}</div>))}
            </div>
        </div>
    );
};

export default Tabs;
