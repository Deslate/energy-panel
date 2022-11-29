import React from "react";

import "./TitleArea.css"

var _clock_flag = true;

const TitleArea = ({time, setTime}) => {

    const [ second, setSecond ] = React.useState();
    const [ minute, setMinute ] = React.useState();

    React.useEffect(()=>{
        setSecond(new Date().getSeconds().toString().padStart(2, '0'))
        if(_clock_flag){
            setInterval(()=>{
                setSecond(new Date().getSeconds().toString().padStart(2, '0'))
                setMinute(new Date().getMinutes().toString().padStart(2, '0'))
            },1000)
            _clock_flag = false
        }
    },[])

    return (
        <div className="TitleArea">
            <div className="TitleAreaLeft">
                <div className="TitleLeft">
                    <div className="TitleLeft_avatar">

                    </div>
                    <button className="TitleLeft_id">Some Name</button>
                </div>
            </div>

            <div className="TitleAreaLeftRightCenter">
                <div className="TitleAreaLeftRightCenterRect"></div>
                <div className="TitleAreaLeftCenterTriangle"></div>
            </div>

            <div className="TitleAreaCenter">
                <div className="Title">Virtual Power Plant UI</div>
            </div>

            <div className="TitleAreaLeftRightCenter">
                <div className="TitleAreaLeftRightCenterRect"></div>
                <div className="TitleAreaRightCenterTriangle"></div>
            </div>

            <div className="TitleAreaRight">
                <div className="TitleRight">
                    {/* <button>菜单项1</button> */}
                    {/* <button onClick={()=>setTime((time+1>=24)?0:time+1)}>时间+</button>
                    <button onClick={()=>setTime((time-1<0)?0:time-1)} className="end">时间-</button> */}
                    <div className="TitleRight-clock">
                        <span className="start">{new Date().getFullYear().toString()}.{new Date().getMonth().toString()}.{new Date().getDate().toString().padStart(2, '0')}</span>
                        <span className="start">{time}:{minute}:{second}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TitleArea