import React from "react";
import "./digit_display.css"

const DigitDisplay = ({
    number,
    title,
}) => {
    
    return (
        <div className="DigitDisplay">
            <div className="span_container">
                <span>{typeof(number)==="string"?number:number.toFixed(2)}</span>
            </div>
            <h2>{title}</h2>
        </div>
    )
}

export default DigitDisplay