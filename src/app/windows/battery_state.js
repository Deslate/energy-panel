import './battery_state_grid.css'
import React from 'react';
import { API } from '../const.js'
import { message } from 'antd';

import configure_icon from './configure.svg'
import close_icon from './close.svg'
import down_icon from './down.svg'

import state1_icon from '../areas/state1.svg'
import state2_icon from '../areas/state2.svg'
import state3_icon from '../areas/state3.svg'
import { Area } from '@ant-design/charts';

const CircleProgress = ({progress}) => {
    return (
        <svg height="140" width="140">
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#469DB9" />
                    <stop offset="100%" stop-color="rgba(54, 141, 169, 0.4)" />
                </linearGradient>
            </defs>
            <circle className='circle-progress-background'
                cx="70" cy="72.5" r="50" 
                fill="none" stroke="#293A4E"
                stroke-width="5" stroke-linecap="round"
                stroke-dasharray="258,10000"
            />
            <circle className="circle-progress-content"
                cx="70" cy="72.5" r="50" 
                fill="none" stroke="url(#gradient)" 
                stroke-width="5" stroke-linecap="round"
                stroke-dasharray={`${258 * progress/100},10000`}
            />
        </svg>
    )
}

const FilledCurveComponent = ({data}) => {
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

    return (
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
    )
}

function BatteryState({shown, setShown, item }) {

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
    const [ battery_data, setBatteryData] = React.useState([])
    
    React.useEffect(()=>{
        let flag = true;
        switch(mode){
            case 'CEF': if(data_CEF_cache){setData(data_CEF_cache); flag=false;} break;
            case 'Price': if(data_Price_cache){setData(data_Price_cache); flag=false;} break;
            case 'Total': if(data_Total_cache){setData(data_Total_cache); flag=false;} break;
        }
        if(flag){
            const hide = message.loading('模式切换中..', 0);
            setLoading(true)
            fetch(`${API}/?mode=${mode}`)
            .then(res=>{
                setLoading(false)
                hide()
                if(res.status==200){
                    try{
                        return res.json()
                    }catch{
                        return
                    }
                }else{
                    message.error('Server Down')
                    return 
                }
            })
            .then(_data=>{if(_data){
                setData(_data);
                switch(mode){
                    case 'CEF': setDataCEFCache(_data); break;
                    case 'Price': setDataPriceCache(_data); break;
                    case 'Total': setDataTotalCache(_data); break;
                }
            }})
        }
    },[mode])
    const [ time, setTime ] = React.useState(new Date().getHours())

    React.useEffect(()=>{
        fetch('api/battery_state/').then(res=>{
            return res.json()
        }).then(data=>{
            console.log(data)
            setBatteryData(data)
        })
    },[])

    

    return (
        <div className="BatteryStateWindow area" hidden={!shown}>
            <div className='layout'>


                <div className="header">
                    <h2>电池状态</h2>
                    <div className="header-right">
                        <div className="header-right-button">
                            <img src={configure_icon}></img>
                        </div>

                        <div className="header-right-button" onClick={()=>{setShown(false)}}>
                            <img src={close_icon} className="img_close"></img>
                        </div>
                    </div>
                </div>


                <div className="line1">
                    <div className="line1-left">
                        <div className="leftside">
                            <img src={down_icon}></img>
                        </div>
                        <div className='rightside'>
                            <div className='topside'>
                                <div className='battery-group'>
                                    一号电池组
                                </div>
                                <div className='battery-status'>
                                    待机中
                                    <div className="battery-status-icon">
                                        {item.state===1?(
                                            <img src={state1_icon}/>
                                        ):item.state===2?(
                                            <img src={state2_icon}/>
                                        ):item.state===3?(
                                            <img src={state3_icon}/>
                                        ):<img src={state2_icon}/>}
                                    </div>
                                </div>
                            </div>
                            <div className='bottomside'>
                                已运行{100}天{10}天{26}分{32}秒
                            </div>
                        </div>
                    </div>
                    <div className='line1-middle'> 
                        <div className='line1-middle-item electricity'>
                            <div className='line1-middle-pitch-background'>
                                <div className='line1-middle-pitch-number'>
                                    {battery_data.current_now}
                                </div>
                                <div className='line1-middle-pitch-text'>
                                    电流
                                </div>

                                <CircleProgress progress={100}/>
                            </div>
                        </div>
                        <div className='line1-middle-item voltage'>
                            <div className='line1-middle-pitch-background'>
                                <div className='line1-middle-pitch-number'>
                                    {battery_data.voltage_now}
                                </div>
                                <div className='line1-middle-pitch-text'>
                                    电压
                                </div>

                                <CircleProgress progress={50}/>
                            </div>
                        </div>
                        <div className='line1-middle-item power'>
                            <div className='line1-middle-pitch-background'>
                                <div className='line1-middle-pitch-number'>
                                    {battery_data.power_now}
                                </div>
                                <div className='line1-middle-pitch-text'>
                                    功率
                                </div>

                                <CircleProgress progress={50}/>
                            </div>
                        </div>
                        <div className='line1-middle-item Soc'>
                            <div className='line1-middle-pitch-background'>
                                <div className='line1-middle-pitch-number'>
                                    {battery_data.soc_now}
                                </div>
                                <div className='line1-middle-pitch-text'>
                                    Soc
                                </div>

                                <CircleProgress progress={20}/>
                            </div>
                        </div>
                        <div className='line1-middle-item SoH'>
                            <div className='line1-middle-pitch-background'>
                                <div className='line1-middle-pitch-number'>
                                    {battery_data.soh_now}
                                </div>
                                <div className='line1-middle-pitch-text'>
                                    SoH
                                </div>

                                <CircleProgress progress={70}/>
                            </div>
                        </div>
                    </div>


                    <div className='line1-right'>
                        <div className='total-save-text'>
                            累计节省
                        </div>
                        <div className='total-save-number'>
                            {battery_data.price_yearly}
                        </div>
                    </div>


                </div>

                <div className='line2'>
                    <div className='line2-a'>
                        累计充电量
                    </div>

                    <div className='line2-b'>
                        累计放电量
                    </div>

                    <div className='line2-c'>
                        累计节约成本
                    </div>

                    <div className='line2-1'>
                        <FilledCurveComponent data={battery_data.charge_electricity_chart||[]} />
                    </div>
                    <div className='line2-2'>
                        <FilledCurveComponent data={battery_data.discharge_electricity_chart||[]} />
                    </div>
                    <div className='line2-3'>
                        <FilledCurveComponent data={battery_data.price_chart||[]} />
                    </div>
                </div>


            </div>
        </div>
    );
}

export default BatteryState;
