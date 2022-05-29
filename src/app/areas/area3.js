import React from "react";
import demo_data from "../demo_data";
import FilledCurve from "./area_templates/filled_curve/FilledCurve";

const Area3 = ({ data, time }) => {

    //console.log(data)

    return (
    <FilledCurve title = { "24小时CEF变化" }
        data = { data.map(i=>({...i, value:i.value*10})) }
        time = { time }
        unit = {"gCO2/kWh"}
        keyname = {"CEF"}
    />
    )
}

export default Area3