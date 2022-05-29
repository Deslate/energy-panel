import React from "react";
import DigitDisplay from "./area_templates/digit_display/digit_display";

const Area4 = ({value}) => {
    return (
        <DigitDisplay
            title={"当前电网买电量 P_grid"}
            number={value!==null?value:'LOADING'}
        />
    )
}

export default Area4