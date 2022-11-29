import React from "react";
import "./digit_display.css"

const DigitDisplay = ({
    number,
    title,
    horizontal
}) => {
    
    return (
        <div className={horizontal?"DigitDisplay_row":"DigitDisplay"}>
            <h3>{title}</h3>
            <div className="span_container">
                <span>{typeof(number)==="string"?number:number.toFixed(2)}</span>
            </div>
            
        </div>
    )
}

export default DigitDisplay