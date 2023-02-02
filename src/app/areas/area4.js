import React from "react";
import DigitDisplay from "./area_templates/digit_display/digit_display";
import FilledCurve from "./area_templates/filled_curve/FilledCurve";

const Area4 = ({data, time}) => {

    const [ current_data, setCurrentData ] = React.useState([])

    React.useEffect(()=>{
        fetch('api/current/').then(res=>res.json()).then(data=>{
            console.log(data.result)
            setCurrentData(data.result.map((i,index)=>({t:index,value:i.a})))
            // setCurrentData([
            //     {t: '1', value: 100},
            //     {t: '2', value: 100},
            // ])
        })
    },[])

    return (
        <FilledCurve
            data = { current_data }
            time = { time }
            unit = {"gCO2/kWh"}
            keyname = {"CEF"}
            display_title={"当前出力"}
            layout={'leftbottom'}
            number={19230}
        />
    )
}

export default Area4