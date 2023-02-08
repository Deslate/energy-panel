import React from "react";
import demo_data from "../demo_data";
import FilledCurve from "./area_templates/filled_curve/FilledCurve";

const Area7 = ({data, time}) => {

    const [ carbon_data, setCarbonData ] = React.useState([]);
    const [ carbon_title, setCarbontitle ] = React.useState(0.0);
    const [ carbon_chart, setCarbonchart] = React.useState([]);

    React.useEffect(()=>{
        fetch('api/carbon/').then(res=>{
            return res.json();
        }).then(data=>{
            console.log(data);
            setCarbonData(data);
            setCarbonchart(data.carbon_hourly.map((i,index)=>({t:index,value:i.a})))
        })
    },[])

    React.useEffect(()=>{
        setCarbontitle(carbon_data.carbon_now);
    },[carbon_data]);

    return (
        <FilledCurve
            title={"碳排放"}
            data={carbon_chart}
            time={time}
            unit = {"KW"}
            keyname = {"负荷"}
            display_title={"碳排放量"}
            display_horizontal={true}
            number={carbon_title}
        />
    )
}

export default Area7