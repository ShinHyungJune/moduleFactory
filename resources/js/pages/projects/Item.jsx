import React, {} from 'react';
import {Link} from "react-router-dom";
import Pop from '../../components/common/Pop';

const Item = ({item, items, setItems}) => {

    const destroy = () => {
        axios.delete("/api/projects/" + item.id)
            .then(response => {
                window.setFlash(response.data.message);
                
                setItems({
                    ...items,
                    data: items.data.filter(itemData => itemData.id !== item.id)
                });
            })
    };
    
    return (
        <div className="card-wrap">
            {/* 삭제 확인 */}
            <Pop name={`${item.title}(#${item.id})`} buttons={[
                (<button className="btn type02" onClick={destroy}>확인</button>),
                (<button className="btn type02 bg-gray" onClick={() => window.setPop("")}>취소</button>)
            ]}>
                <p style={{textAlign:"center"}}>정말로 삭제하시겠습니까?</p>
            </Pop>
            
            <div className="card">
                <div className="wrap-box-ratio">
                    <div className="box-ratio">
                        <img src={item.img ? item.img.url : ""} alt=""/>
                    </div>
                </div>
        
                <div className="card-content">
                    <h2 className="title">{item.title}</h2>
            
                    <p className="body">{item.body}</p>
            
                    <p className="date">{item.created_at}</p>
                </div>
                
                <div className="utils">
                    <button className="btn type03 bg-red" title="삭제" onClick={() => {window.setPop(`${item.title}(#${item.id})`)}}>
                        <img src="/img/trash--white.png" alt="삭제"/>
                    </button>
    
                    <Link to={"/projects/edit/" + item.id} title="수정" className="btn type03 bg-sub">
                        <img src="/img/edit--white.png" alt="수정" style={{paddingLeft:"2px"}}/>
                    </Link>
    
                    <button className="btn type03 bg-accent" title="멤버 초대" onClick={() => {window.setFlash("준비중입니다.")}}>
                        <img src="/img/userPlus--white.png" alt="멤버초대" style={{paddingLeft:"3px"}}/>
                    </button>
    
                    <Link to={"/projects/" + item.id} title="자세히 보기" className="btn type03 bg-primary">
                        <img src="/img/arrowUp--white.png" alt="바로가기"/>
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default Item;
