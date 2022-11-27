import React from "react";
import DigitDisplay from "./area_templates/digit_display/digit_display";
import FilledCurve from "./area_templates/filled_curve/FilledCurve";

const Area4 = ({data, time}) => {
    return (
        <FilledCurve
            data = { data.map(i=>({...i, value:i.value*10})) }
            time = { time }
            unit = {"gCO2/kWh"}
            keyname = {"CEF"}
            display_title={"当前出力"}
        />
    )
}

export default Area4