import React from "react";
import "./digit_display.css"

const DigitDisplay = ({
    number,
    title,
}) => {
    
    return (
        <div className="DigitDisplay">
            <span>{number}</span>
            <h2>{title}</h2>
        </div>
    )
}

export default DigitDisplay