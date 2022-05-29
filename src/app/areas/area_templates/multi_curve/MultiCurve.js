import React from "react";
import "./MultiCurve.css"
import { Line } from '@ant-design/plots';


const MultiCurve = ({
    title,
    data
}) => {

    const config = {
        data,
        xField: 'date',
        yField: 'value',
        yAxis: {
            label: {
                // 数值格式化为千分位
                formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
        },
        seriesField: 'type',
        color: ({ type }) => {
            return type === '用电' ? '#8cc0ff' : type === '产电' ? '#a9acff' : 'rgb(132, 243, 255)';
        },
        lineStyle: ({ type }) => {
            if (type === '用电') {
                return {
                    lineDash: [4, 4],
                    opacity: 1,
                };
            }

            return {
                opacity: 0.8,
            };
        },
    };

    const container = React.useRef()

    const [container_height, setContainerHeight] = React.useState(220)

    React.useEffect(() => {
        if (container.current) {
            //console.log(container.current.clientHeight)
            setContainerHeight(container.current.clientHeight)
        }
    }, [container])

    return ( <
        div className = "MultiCurve area_layout"
        ref = { container } >
        <
        h2 > { title } < /h2> <
        div className = "graph_container" >
        <
        Line {...config }
        smooth / >
        <
        /div> <
        /div>
    )

}

export default MultiCurve