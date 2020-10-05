import React, {} from 'react';
import {connect} from "react-redux";

const Item = ({item}) => {
    console.log(item);
    return (
        <div className="card-wrap">
            <div className="card">
                <div className="wrap-box-ratio">
                    <div className="box-ratio">
                        <img src={item.img ? item.img.url : ""} alt=""/>
                    </div>
                </div>
        
                <div className="card-content">
                    <p className="title">{item.title}</p>
            
                    <div className="tags type01">
                        {item.tags.data.map(tag => <span className="tag" key={tag.id}>#{tag.name}</span>)}
                    </div>
            
                    <p className="date">{item.created_at}</p>
                </div>
            </div>
        </div>
    );
};


export default Item;
