import React from "react";
import { Bullet } from '@ant-design/plots';
import "./area_x.css"

const Area7 = () => {

    const [ data, setData ] = React.useState([])

    React.useEffect(()=>{
        setData([
            {
              title: '剩余A',
              ranges: [100],
              measures: [80],
              target: 100,
            },
            {
                title: '剩余B',
                ranges: [100],
                measures: [80],
                target: 100,
            },
            {
                title: '剩余C',
                ranges: [100],
                measures: [80],
                target: 100,
            },
            {
                title: '剩余D',
                ranges: [100],
                measures: [80],
                target: 100,
            },
        ])
    },[])

    const config = {
        data,
        measureField: 'measures',
        rangeField: 'ranges',
        targetField: 'target',
        xField: 'title',
        color: {
            range: '#252832',
            measure: '#5B8FF9',
            target: '#3D76DD',
        },
        xAxis: {
            line: null,
        },
        yAxis: false,
        layout: 'vertical',
        label: {
            measure: {
                position: 'middle',
                style: {
                fill: '#fff',
                },
            },
        },
    };

    return (
        <div className="BatteryPanel area_layout">
            <h2>标题</h2>
            <div className="bullet_container">
                <Bullet {...config} legend={false} />
            </div>
        </div>
    )
}

export default Area7