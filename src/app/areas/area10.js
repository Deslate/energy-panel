import React from "react";
import demo_data from "../demo_data";
import FilledCurve from "./area_templates/filled_curve/FilledCurve";

import './BatteryState.css'

const Area10 = ({ time}) => {

    const data = [
        {name:'一号电池组', state:1, remain: 0.4},
        {name:'二号电池组', state:2, remain: 0.8},
        {name:'三号电池组', state:3, remain: 0.2},
    ]

    return (
        <div className="BatteryState area_layout">
            <div>
                <h2>电池状态</h2>
                {data.map(item=>(
                    <div>
                        <span>{item.name}</span>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Area10