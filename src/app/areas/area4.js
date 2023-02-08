import React from "react";
import DigitDisplay from "./area_templates/digit_display/digit_display";
import FilledCurve from "./area_templates/filled_curve/FilledCurve";

const Area4 = ({data, time}) => {

    const [ power_title, setPowertitle ] = React.useState(0.0);
    const [ power_chart, setPowerchart] = React.useState([]);

    React.useEffect(()=>{
        fetch('api/pv/').then(res=>{
            return res.json();
        }).then(data=>{
            console.log(data);
            setPowertitle(data.power_now);
            setPowerchart(data.dc_power.map((i,index)=>({t:index,value:i.a})))
        })
    },[])


    return (
        <FilledCurve
            data = { power_chart }
            time = { time }
            unit = {"gCO2/kWh"}
            keyname = {"CEF"}
            display_title={"当前出力"}
            layout={'leftbottom'}
            number={ power_title }
        />
    )
}

export default Area4