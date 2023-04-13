import React from "react";
import DigitDisplay from "./area_templates/digit_display/digit_display";
import FilledCurve from "./area_templates/filled_curve/FilledCurve";

const Area5 = ({data, time}) => {

    const [ discharge_title, setDischargetitle ] = React.useState(0.0);
    const [ discharge_chart, setDischargechart] = React.useState([]);

    React.useEffect(()=>{
        fetch('/api/pv/').then(res=>{
            return res.json();
        }).then(data=>{
            console.log(data);
            setDischargetitle(data.discharge_quality_now);
            setDischargechart(data.dc_discharge_quality.map((i,index)=>({t:index,value:i.a})))
        })
    },[])

    return (
        <FilledCurve 
            data = { discharge_chart }
            time = { time }
            unit = {"gCO2/kWh"}
            keyname = {"CEF"}
            display_title={"累计发电量"}
            layout={'lefttop'}
            number={ discharge_title }
            fill
        />
    )
}

export default Area5