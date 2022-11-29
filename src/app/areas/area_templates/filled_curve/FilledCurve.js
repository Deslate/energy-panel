import React from "react";
import "./FilledCurve.css"
import { Area, Line } from '@ant-design/plots';
import DigitDisplay from "../digit_display/digit_display";

const FilledCurve = ({
    title,
    data,
    time,
    unit,
    keyname,
    display_horizontal,
    display_title,
    layout,
    number=0,
    fill
}) => {

    const [ _data, setData ] = React.useState(data)

    React.useEffect(()=>{
        let _data = data.map(i=>{
            let _time = time===undefined?0:time;
            let t = parseInt(i.t)
            for (let i=0; i<23-_time+1; i++){
                t =  t===23? 0: t+1
            }
            return {...i, t:t};
        })
        _data.sort(function(a,b){return a.t-b.t})
        setData(_data)
    },[time, data])

    React.useEffect(()=>{
        console.log(_data)
    },[_data])

    const config = {
        data: _data,
        xField: 't',
        yField: 'value',
        areaStyle: () => {
            return {
                fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
            };
        },
        tooltip: {
            customContent: (title, data) => {
                if (!data[0]) return null
                let t = data[0].data.t
                let _time = time===undefined?0:time;
                for (let i=0; i<_time+1; i++){
                    t =  t===23? 0: t+1
                }
                return data[0]? (
                    <div style={{padding:10}}>
                        <p>时间段：{t}:00</p>
                        <p>{keyname||"负荷"}：{data[0].data.value.toFixed(2)} {unit||"KW"}</p>
                    </div>
                ):null
            }
        }
    };

    const container = React.useRef()

    const [container_height, setContainerHeight] = React.useState(220)

    React.useEffect(() => {
        if (container.current) {
            //console.log(container.current.clientHeight)
            setContainerHeight(container.current.clientHeight)
        }
    }, [container])

    return (
        <div className = {`FilledCurve${layout?'_'+layout:''} area_layout`} ref = { container } >
            {title?<h2> { title } </h2>:null }
            <div className="FilledCurve_digit">
                <DigitDisplay number={''+number} title={display_title} horizontal={display_horizontal}/>
            </div>
            <div className = "graph_container" >
                {fill?(
                    <Area {...config } xAxis={{
                        label:{formatter:(text, index, total)=>{
                            let t = parseInt(text)
                            let _time = time===undefined?0:time
                            for (let i=0; i<_time+1; i++){
                                t =  t===23? 1: t+1
                            }
                            return t;
                        }}
                    }}/>
                ):(
                    <Line {...config } xAxis={{
                    label:{formatter:(text, index, total)=>{
                        let t = parseInt(text)
                        let _time = time===undefined?0:time
                        for (let i=0; i<_time+1; i++){
                            t =  t===23? 1: t+1
                        }
                        return t;
                    }}
                    }}/>
                )}
            </div>
        </div>
    )

}

export default FilledCurve