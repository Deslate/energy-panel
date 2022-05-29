import React from "react";
import { message, Radio } from 'antd';
import "./area1.css"

const Area1 = ({ value, setMode }) => {

    const options = [
        { label: '排放最低', value: 'CEF', attribute: "当前减少排放(KG)" },
        { label: '电价最低', value: 'Price', attribute: "当前减少用电成本(元)" },
        { label: '总成本最低', value: 'Total', attribute: "当前减少总成本(元)" },
    ];

    const [mode, _setMode] = React.useState(options[0].value);
    const [changed, setChanged] = React.useState(false);
    const [attribute, setAttribute] = React.useState(options[0].attribute);

    React.useEffect(() => {
        //console.log(mode)
        if (!changed) {
            setChanged(true);
        } else {
            let mode_name = '';
            options.forEach(i => { if (i.value === mode) mode_name = i.label });
            message.info("优化模式切换为：" + mode_name);
        }
        let attribute_name = '';
        options.forEach(i => { if (i.value === mode) attribute_name = i.attribute });
        setAttribute(attribute_name);

        setMode(mode)
    }, [mode])

    return ( <
        div className = "Control" >
        <
        h2 > 优化模式 < /h2> <
        Radio.Group options = { options }
        onChange = { e => _setMode(e.target.value) }
        value = { mode }
        optionType = "button" /
        >
        <
        span className = "digit" > {
            (value + '').slice(0, 9) } < /span> <
        span > { attribute } < /span> <
        /div>
    )
}

export default Area1