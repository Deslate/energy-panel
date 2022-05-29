import React from "react";
import "./GroupColumns.css"
import { Column } from '@ant-design/plots';

const GroupColumns = ({
    title,
    data
}) => {

    const config = {
        data,
        isStack: true,
        xField: 'year',
        yField: 'value',
        seriesField: 'type',
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle'
            // 可配置附加的布局方法
            layout: [
                // 柱形图数据标签位置自动调整
                {
                    type: 'interval-adjust-position',
                }, // 数据标签防遮挡
                {
                    type: 'interval-hide-overlap',
                }, // 数据标签文颜色自动调整
                {
                    type: 'adjust-color',
                },
            ],
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
        div className = "GroupColumns area_layout"
        ref = { container } >
        <
        h2 > { title } < /h2> <
        div className = "graph_container" >
        <
        Column {...config }
        legend = { false }
        /> <
        /div> <
        /div>
    )

}

export default GroupColumns