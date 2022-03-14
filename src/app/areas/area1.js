import React from "react";
import MultiCurveArea from "./area_templates/multi_curve/multi_curve";

const Area1 = () => {
    return (
        <MultiCurveArea
            title={"示例区域1"}
            data={{
                curve1: [1,3,4,2,3,4,2,4,5,5],
                curve2: [1,3,4,2,3,4,2,4,5,5],
                curve3: [1,3,4,2,3,4,2,4,5,5]
            }}
        />
    )
}

export default Area1