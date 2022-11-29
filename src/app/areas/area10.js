import React from "react";
import demo_data from "../demo_data";
import FilledCurve from "./area_templates/filled_curve/FilledCurve";

import state1_icon from './state1.svg'
import state2_icon from './state2.svg'
import state3_icon from './state3.svg'

import './BatteryState.css'

const Area10 = ({ time, setShowBatteryDetail }) => {

    const data = [
        {name:'一号电池组', state:1, remain: 0.4},
        {name:'二号电池组', state:2, remain: 0.8},
        {name:'三号电池组', state:3, remain: 0.2},
    ]

    return (
        <div className="BatteryState area_layout">
            <h2>电池状态</h2>
            <div className="BatteryList">
            {data.map(item=>(
                <div className="BatteryStateItem" onClick={()=>setShowBatteryDetail(true)}>
                    <div className="BatteryStateItem_line1">
                        <span>{item.name}</span>
                        <div className="BatteryState_icon">
                            {item.state===1?(
                                <img src={state1_icon}/>
                            ):item.state===2?(
                                <img src={state2_icon}/>
                            ):item.state===3?(
                                <img src={state3_icon}/>
                            ):null}
                        </div>
                    </div>

                    <div className="BatteryState_bar">
                        <div className="BatteryState_bar_progress" style={{width:(item.remain * 100) + '%'}}/>
                    </div>

                    <div></div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Area10