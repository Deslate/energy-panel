import React from "react";
import "./FilledCurve.css"
import { Area } from '@ant-design/plots';

const FilledCurve = ({
    title,
    data
}) => {

    const config = {
        data,
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            range: [0, 1],
            tickCount: 5,
        },
        areaStyle: () => {
            return {
                fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
            };
        },
    };

    const container = React.useRef()

    const [container_height, setContainerHeight ] = React.useState(220)

    React.useEffect(()=>{
        if(container.current){
            console.log(container.current.clientHeight)
            setContainerHeight(container.current.clientHeight)
        }
    },[container])

    return (
        <div className="FilledCurve area_layout" ref={container}>
            <h2>{title}</h2>
            <div className="graph_container">
                <Area {...config}/>
            </div>
        </div>
    )

}

export default FilledCurve