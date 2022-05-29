import React from "react";

import "./TitleArea.css"

const TitleArea = ({time, setTime}) => {
    return (
        <div className="TitleArea">
            <div className="TitleLeft">
                <button className="start">时间：{time}:{new Date().getMinutes().toString().padStart(2, '0')}</button>
            </div>
            <div className="Title">低碳能源管理系统</div>
            <div className="TitleRight">
                {/* <button>菜单项1</button> */}
                <button onClick={()=>setTime((time+1>=24)?0:time+1)}>时间+</button>
                <button onClick={()=>setTime((time-1<0)?0:time-1)} className="end">时间-</button>
            </div>
        </div>
    )
}

export default TitleArea