import React from "react";
import demo_data from "../demo_data";
import FilledCurve from "./area_templates/filled_curve/FilledCurve";

const Area3 = ({ data, time }) => {

    //console.log(data)

    const [ er_data, setErdata ] = React.useState([]);
    const [ er_title, setErtitle ] = React.useState(0.0);
    const [ er_chart, setErchart] = React.useState([]);  
    
    React.useEffect(()=>{
        fetch('/api/emission_reduction/').then(res=>{
            return res.json();
        }).then(data=>{
            console.log(data);
            setErdata(data);
            setErtitle(data.total_reduction);
            setErchart(data.er_chart.map((i,index)=>({t:index,value:i.a})))
        })
    },[])

    return (
    <FilledCurve title = { "全系统减排" }
        data = { er_chart }
        time = { time }
        unit = {"gCO2/kWh"}
        keyname = {"CEF"}
        display_title={"累计减排"}
        display_horizontal={true}
        number={er_title}
        fill
    />
    )
}

export default Area3