import React from "react";
import demo_data from "../demo_data";
import Columns from "./area_templates/columns/Columns";
import FilledCurve from "./area_templates/filled_curve/FilledCurve";
import { Modal } from 'antd';
import * as echarts from 'echarts/lib/echarts.js'
import { GridComponent } from 'echarts/components'
import 'echarts/lib/chart/line';
import { TooltipComponent } from 'echarts/components';
import { reorder } from "./area8";
echarts.use([TooltipComponent])
echarts.use([GridComponent])
const Area9 = ({ data, time }) => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [currentTab, setcurrentTab] = React.useState(false);
    let _data = data.filter(i => i != undefined && i.t == time)

    //console.log(data,_data)
    const showModal = (itemKey) => {
        console.log(itemKey)  
        setIsModalVisible(true);
        setcurrentTab(itemKey)
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    React.useEffect(() => {
        console.log(currentTab)    
        if(currentTab === false) return
           let lineList = new Array(24)
           for (let i in data) {
               if (data[i].k == currentTab) {
                   lineList[data[i].t - 1] = data[i].value
               }
           }
           let chart2 = echarts.init(document.getElementById('right3Line'))
           chart2.setOption({
               xAxis: {
                   type: 'category',
                   boundaryGap: false,
                   data: reorder(['0', '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'], time),
                 },
                 yAxis: {
                   type: 'value'
                 },
                 tooltip:{},
                 series: [
                   {
                     data: reorder(lineList, time),
                     type: 'line',
                     areaStyle: {}
                   }
                 ]
           })
   
       }, [currentTab]);
    return (
        <div style={{width:'100%'}}>
            <Columns data={_data}
                title="光伏供电设备功率"
                config={
                    {
                        xField: 'k',
                        yField: 'value',
                        // xAxis:false,
                        // yAxis:false,
                    }
                }
                onReady={(plot) => {
                    plot.on('plot:click', (evt) => {

                        const { x, y } = evt;
                        const { xField } = plot.options;
                        const tooltipData = plot.chart.getTooltipItems({ x, y });

                        showModal(tooltipData[0].title)


                    });
                }}
            />
       
            <Modal title="24小时详情" visible={isModalVisible} onCancel={handleCancel} footer={<div></div>}  >
                <div id="right3Line" style={{ width: '520px', height: '600px' }}></div>
            </Modal>
        </div>

    )
}

export default Area9