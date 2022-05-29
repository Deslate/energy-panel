import React from "react";
import DigitDisplay from "./area_templates/digit_display/digit_display";

const Area5 = ({value}) => {
    return (
        <DigitDisplay
            title={"当前电网卖电量 P_sell"}
            number={value!==null?(value+'').slice(0, 9):'LOADING'}
        />
    )
}

export default Area5