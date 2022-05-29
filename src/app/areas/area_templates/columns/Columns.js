import React from "react";
import "./Columns.css"
import { Column } from '@ant-design/plots';

const Columns = ({
    title,
    data,
    config,
    onReady
}) => {

    const _config = {
        data,
        xField: 'k',
        yField: 'value',
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        color: 'rgb(95, 132, 255)',
        // minColumnWidth: 10,
        // maxColumnWidth: 10,

        ...config,
    };

    const container = React.useRef()

    const [container_height, setContainerHeight] = React.useState(220)

    React.useEffect(() => {
        // if (container.current) {
        //     //console.log(container.current.clientHeight)
        //     setContainerHeight(container.current.clientHeight)
        // }
    }, [container])

    return (
        <div className="FilledCurve area_layout" ref={container} >
            <h2 > {title} </h2>
            <div className="graph_container" >
                <Column {..._config}
                    legend={false}
                    onReady={onReady}
                />
            </div>
        </div>
    )

}

export default Columns