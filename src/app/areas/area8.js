import React from "react";
import { Heatmap } from '@ant-design/plots';
import { Modal } from 'antd';
import * as echarts from 'echarts/lib/echarts.js'
import { GridComponent } from 'echarts/components'
import 'echarts/lib/chart/line';
import { TooltipComponent } from 'echarts/components';
echarts.use([TooltipComponent])
echarts.use([GridComponent])

export const reorder = (list, time) => {

    let _time = time===undefined?0:time;

    let _list = list.map((i, index)=>{
        let x = index
        for (let i=0; i<(23-_time); i++){
            x =  x===23? 0: x+1
        }
        return {i:i, x:x};
    })
    _list.sort(function(a,b){return a.x-b.x})
    return _list.map(item=>item.i)
}




const Area8 = ({ P_ch, P_dis, B_ch, B_dis, time }) => {

    const [data, setData] = React.useState([])
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [currentTab, setcurrentTab] = React.useState(false);

    React.useEffect(() => {
        let max_k = P_ch.length / 24
        let _data = new Array(max_k)
        P_ch.forEach(rec => {
            if (rec.t === time) _data[rec.k] = { k: rec.k, P_ch: rec.value }
        })
        P_dis.forEach(rec => {
            if (rec.t === time) _data[rec.k].P_dis = rec.value
        })
        B_ch.forEach(rec => {
            if (rec.t === time) _data[rec.k].B_ch = rec.value
        })
        B_dis.forEach(rec => {
            if (rec.t === time) _data[rec.k].B_dis = rec.value
        })
        _data = _data.filter(e => e !== undefined);
        _data.forEach(rec => {
            rec.value = rec.P_ch - rec.P_dis
            rec.x = parseInt((rec.k - 1) / 20)
            rec.y = '' + (rec.k - 20 * rec.x)
            rec.x = '' + (rec.x + 1)
        })
     
        setData(_data)
    }, [P_ch, P_dis, B_ch, B_dis, time])
  

  
    const config = {
        autoFit: true,
        data: data,
        xField: 'x',
        yField: 'y',
        colorField: 'value',
        color: ['#3136b5', '#6c83d1', '#dfdfdb', '#937add', '#5523a6'],
        tooltip: {
            title: 'k',
            customContent: (title, data) => {
                let _data = (data[0] ? data[0].data : {})
                return (<div style={
                    { display: 'flex', flexDirection: 'column', padding: 3 }} >
                    <span style={
                        { margin: 3 }} > {title} </span> <span style={
                            { margin: 3 }} > P_ch: {
                            (_data.P_ch + '').slice(0, 6)} </span> <span style={
                                { margin: 3 }} > P_dis: {
                            (_data.P_dis + '').slice(0, 6)} </span> </div>
                );
            },
        },
    };
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
        for (let i in B_ch) {
            if (B_ch[i].k == currentTab) {
                lineList[B_ch[i].t - 1] = P_ch[i].value - P_dis[i].value
            }
        }
        let chart = echarts.init(document.getElementById('right2Line'))
        chart.setOption({
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: reorder(['0', '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'], time)
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
        <div className="FilledCurve area_layout">
            <h2> {"储能设备状态"} </h2>
            <div className="graph_container" >
                <Heatmap {...config} xAxis={false} onReady={(plot) => {
                    plot.on('plot:click', (evt) => {

                        const { x, y } = evt;
                        const { xField } = plot.options;
                        const tooltipData = plot.chart.getTooltipItems({ x, y });
           
                        showModal(tooltipData[0].title)


                    });
                }}
                />
            </div>
            <Modal title={`24小时详情 - 储能设备${currentTab}`} visible={isModalVisible} onCancel={handleCancel} footer={<div></div>}  >
                <div id="right2Line" style={{width:'520px',height:'600px'}}></div>
            </Modal>
        </div>
    );
}


// const Area8 = () => {
//   const [data, setData] = React.useState([]);

//   React.useEffect(() => {
//     asyncFetch();
//   }, []);

//   const asyncFetch = () => {
//     fetch('https://gw.alipayobjects.com/os/basement_prod/a719cd4e-bd40-4878-a4b4-df8a6b531dfe.json')
//       .then((response) => response.json())
//       .then((json) => setData(json))
//       .catch((error) => {
//         //console.log('fetch data failed', error);
//       });
//   };
//   const config = {
//     width: 650,
//     height: 500,
//     autoFit: false,
//     data,
//     xField: 'Month of Year',
//     yField: 'District',
//     colorField: 'AQHI',
//     color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
//     meta: {
//       'Month of Year': {
//         type: 'cat',
//       },
//     },
//   };

//   return <Heatmap {...config} />;
// };

export default Area8