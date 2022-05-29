import React from "react";
import DigitDisplay from "./area_templates/digit_display/digit_display";

const Area6 = ({value}) => {
    return (
        <DigitDisplay
            title={"当前排放因子（CEF）"}
            number={value?value*10:'LOADING'}
        />
    )
}

export default Area6