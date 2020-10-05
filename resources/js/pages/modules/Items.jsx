import React, {useEffect, useState, Fragment} from 'react';
import {connect} from "react-redux";
import Item from './Item';

const Items = ({match, history}) => {
    let params = {
        project_id: match.params.project_id
    };
    
    let [items, setItems] = useState({
        data: [],
        links: {}
    });
    
    useEffect(() => {
        axios.get("/api/modules", {
            params: params
        }).then(response => {
            setItems(response.data);
        });
    }, []);
    
    return (
        <Fragment>
            <div className="page">
                <div className="page-header">
                    <div className="input-search">
                        <input type="text" placeholder="모듈명 또는 태그명으로 검색해주세요."/>
                    </div>
                    
                    <div className="btns">
                        <button className="btn type01 primary" onClick={() => history.push("/modules/create/" + match.params.project_id)}>모듈 생성</button>
                    </div>
                </div>
    
                {items.data.length === 0
                    ? <div className="empty type01">데이터가 없습니다.</div>
                    : <div className="page-body">
                        <div className="cards type01">
                            {items.data.map(item => (
                                <Item item={item} key={item.id} key={item.id} items={items} setItems={setItems}/>
                            ))}
                        </div>
                    </div>
                }
    
    
                {items.links.next ?
                    <div className="page-footer">
                        <button className="btn type02 width-100">더보기</button>
                    </div> : null
                }
            </div>
        </Fragment>
    );
};



export default Items;
