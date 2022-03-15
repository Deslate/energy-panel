import React from "react";
import "./RadarArea.css"
import { Radar } from '@ant-design/plots';

const RadarArea = ({
    title,
    data
}) => {

    const config = {
        data,
        xField: 'item',
        yField: 'score',
        seriesField: 'user',
        meta: {
            score: {
                alias: '分数',
                min: 0,
                max: 80,
            },
        },
        xAxis: {
            line: null,
            tickLine: null,
            grid: {
                line: {
                    style: {
                        lineDash: null,
                    },
                },
            },
        },
        yAxis: {
            line: null,
            tickLine: null,
            grid: {
                line: {
                    type: 'line',
                    style: {
                        lineDash: null,
                    },
                },
            },
        },
        // 开启面积
        area: {},
        // 开启辅助点
        point: {
            size: 2,
        },
    };

    return (
        <div className="RadarArea area_layout">
            <h2>{title}</h2>
            <Radar {...config} legend={false} style={{height:"calc(100% - 40px)", marginTop:5}} />
        </div>
    )

}

export default RadarArea