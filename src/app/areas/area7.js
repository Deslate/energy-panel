import React from "react";
import demo_data from "../demo_data";
import FilledCurve from "./area_templates/filled_curve/FilledCurve";

const Area7 = ({data, time}) => {


    return (
        <FilledCurve
            title={"碳排放"}
            data={data}
            time={time}
            unit = {"KW"}
            keyname = {"负荷"}
            display_title={"碳排放量"}
            display_horizontal={true}
            number={19230}
        />
    )
}

export default Area7