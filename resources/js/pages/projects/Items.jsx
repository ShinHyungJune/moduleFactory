import React, {useEffect, useState, Fragment} from 'react';
import Item from './Item';
import {Link} from "react-router-dom";

const Items = ({}) => {
    let params = {};
    let [items, setItems] = useState({
        data: [],
        meta: {},
        links: {}
    });
    
    useEffect(() => {
        axios.get("/api/projects", {
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
                        <Link to={"/projects/create"} className="btn type01 primary">프로젝트 생성</Link>
                    </div>
                </div>
                
                {items.data.length === 0
                    ? <div className="empty type01">데이터가 없습니다.</div>
                    : <div className="page-body">
                        <div className="cards type02">
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
