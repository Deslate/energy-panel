import './App.css';
import './grid.css'
import Area1 from './areas/area1';
import Area4 from './areas/area4';
import TitleArea from './areas/title_area/TitleArea';
import MapArea from './areas/map_area/MapArea.js';
import Area8 from './areas/area8';
import Area9 from './areas/area9';
import Area3 from './areas/area3';
import Area2 from './areas/area2';
import Area5 from './areas/area5';
import Area6 from './areas/area6';
import Area7 from './areas/area7';
import React from 'react';
import { API } from './const.js'
import { find,findAll } from './data_processing.js'
import { message } from 'antd';

function App() {

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
        <div className="App">
            <div className="grid-container">
                <div className="area area_title"><TitleArea time={time} setTime={setTime}/></div>
                <div className="col col_l">
                    <div className="area area_l1"><Area1 value={data.result} setMode={setMode} loading={loading}/></div>
                    <div className="area area_l2"><Area2 data={data} time={time}/></div>  
                    <div className="area area_l3"><Area3 data={data.Cef} time={time}/></div>
                </div>
                <div className="row row_ct">
                    <div className="area area_ct1"><Area4 value={find(data.P_grid,{t:time})}/></div>
                    <div className="area area_ct2"><Area5 value={find(data.P_sell,{t:time})}/></div>
                    <div className="area area_ct3"><Area6 value={find(data.Cef,{t:time})}/></div>
                </div>
                <div className="area area_c"><MapArea bchList={findAll(data.B_ch,time)} loadList={findAll(data.Load,time)} PV_PowerList={findAll(data.PV_power,time)} /></div>
                <div className="col col_r">
                    <div className="area area_r1"><Area7 data={data.Total_load} time={time}/></div>
                    <div className="area area_r2"><Area8 P_ch={data.P_ch} P_dis={data.P_dis} B_ch={data.B_ch} B_dis={data.B_dis} time={time}/></div>
                    <div className="area area_r3"><Area9 data={data.PV_power} time={time}/></div>
                </div>
            </div>
        </div>
    );
}

export default App;
