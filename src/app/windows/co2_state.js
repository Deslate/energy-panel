import './co2_state.css'
import React from 'react';
import { API } from '../const.js'
import { message } from 'antd';

import configure_icon from './configure.svg'
import close_icon from './close.svg'
import down_icon from './down.svg'

import state1_icon from '../areas/state1.svg'
import state2_icon from '../areas/state2.svg'
import state3_icon from '../areas/state3.svg'
import { Area, Line } from '@ant-design/charts';



const FilledCurveComponent = ({data, fill}) => {
    const config = {
        data: data.map((i,index)=>({t:index,value:i.a})),
        xField: 't',
        yField: 'value',
        areaStyle: () => {
            return {
                fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
            };
        },
        // tooltip: {
        //     customContent: (title, data) => {
        //         if (!data[0]) return null
        //         let t = data[0].data.t
        //         let _time = time===undefined?0:time;
        //         for (let i=0; i<_time+1; i++){
        //             t =  t===23? 0: t+1
        //         }
        //         return data[0]? (
        //             <div style={{padding:10}}>
        //                 <p>时间段：{t}:00</p>
        //                 <p>{keyname||"负荷"}：{data[0].data.value.toFixed(2)} {unit||"KW"}</p>
        //             </div>
        //         ):null
        //     }
        // }
    };

    return fill?(
        <Area {...config } /*xAxis={{
            label:{formatter:(text, index, total)=>{
                let t = parseInt(text)
                let _time = time===undefined?0:time
                for (let i=0; i<_time+1; i++){
                    t =  t===23? 1: t+1
                }
                return t;
            }}
        }}*//>
    ):(
        <Line {...config } /*xAxis={{
            label:{formatter:(text, index, total)=>{
                let t = parseInt(text)
                let _time = time===undefined?0:time
                for (let i=0; i<_time+1; i++){
                    t =  t===23? 1: t+1
                }
                return t;
            }}
        }}*//>
    )
}

function CO2State({shown, setShown, item }) {

    const [ mode, setMode ] = React.useState('CEF')
    const [ data, setData ] = React.useState({
        B_ch:[],B_dis:[],Cc:[],Pv_total:[],P_ch:[],
        P_dis:[],P_grid:[],P_sell:[],Total_load:[],
        Cef:[],Load:[],PV_power:[],result:'LOADING',
    })
    const [ loading, setLoading ] = React.useState(true)
    const [ data_CEF_cache, setDataCEFCache ] = React.useState(null)
    const [ data_Price_cache, setDataPriceCache ] = React.useState(null)
    const [ data_Total_cache, setDataTotalCache ] = React.useState(null)
    const [ carbon_data, setBatteryData] = React.useState([])


    React.useEffect(()=>{
        fetch('/api/carbon/').then(res=>{
            return res.json()
        }).then(data=>{
            console.log(data)
            setBatteryData(data)
        })
    },[])

    return (
        <div className="CO2StateWindow area" hidden={!shown}>
            <div className='layout'>

                <div className="header">
                    <h2>碳排放</h2>
                    <div className="header-right">
                        <div className="header-right-button">
                            <img src={configure_icon}></img>
                        </div>

                        <div className="header-right-button" onClick={()=>{setShown(false)}}>
                            <img src={close_icon} className="img_close"></img>
                        </div>
                    </div>
                </div>

                <div className='line2'>
                    <div className='line2-a'>
                        负荷
                    </div>

                    <div className='line2-b'>
                        碳排放强度
                    </div>

                    <div className='line2-c'>
                        碳排放量
                    </div>

                    <div className='line2-d'>
                        累计碳排放量
                    </div>

                    <div className='line2-1'>
                        <FilledCurveComponent data={carbon_data.load_info||[]} />
                    </div>
                    <div className='line2-2'>
                        <FilledCurveComponent data={carbon_data.carbon_intensity||[]} />
                    </div>
                    <div className='line2-3'>
                        <FilledCurveComponent data={carbon_data.carbon_hourly||[]} />
                    </div>
                    <div className='line2-4'>
                        <FilledCurveComponent data={carbon_data.carbon_sum||[]} fill />
                    </div>
                </div>


            </div>
        </div>
    );
}

export default CO2State;
