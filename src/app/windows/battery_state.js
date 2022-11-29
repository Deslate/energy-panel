import './battery_state_grid.css'
import Area1 from '../areas/area1';
import Area4 from '../areas/area4';
import TitleArea from '../areas/title_area/TitleArea';
import MapArea from '../areas/map_area/MapArea.js';
import Area8 from '../areas/area8';
import Area9 from '../areas/area9';
import Area3 from '../areas/area3';
import Area2 from '../areas/area2';
import Area5 from '../areas/area5';
import Area6 from '../areas/area6';
import Area7 from '../areas/area7';
import React from 'react';
import { API } from '../const.js'
import { find,findAll } from '../data_processing.js'
import { message } from 'antd';
import Area10 from '../areas/area10';

function BatteryState({shown}) {

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
                    return res.json()
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

    return (
        <div className="BatteryStateWindow area" hidden={!shown}>
            <div className='layout'>
                <h2>电池状态</h2>
            </div>
        </div>
    );
}

export default BatteryState;
