import React from "react";
import demo_data from "../demo_data";
import FilledCurve from "./area_templates/filled_curve/FilledCurve";

const Area7 = ({data, time}) => {


    return (
        <FilledCurve
            title={"24小时内总负载曲线"}
            data={data}
            time={time}
            unit = {"KW"}
            keyname = {"负荷"}
        />
    )
}

export default Area7