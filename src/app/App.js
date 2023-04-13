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
import Area10 from './areas/area10';
import BatteryState from './windows/battery_state';
import PvState from './windows/pv_state';
import CO2State from './windows/co2_state';

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

    const [ show_battery_detail, setShowBatteryDetail ] = React.useState(false)
    const [ show_pv_detail, setShowPvDetail ] = React.useState(false)
    const [ show_co2_detail, setShowCO2Detail ] = React.useState(false)

   
    const [ time, setTime ] = React.useState(new Date().getHours())

    return (
        <div className="App">
            <div className="grid-container">
                <div className="area_title"><TitleArea time={time} setTime={setTime}/></div>
                <div className="col col_l">
                    {/* <div className="area area_l1"><Area1 value={data.result} setMode={setMode} loading={loading}/></div> */}
                    <div className="area area_l2"><Area2 data={data} time={time}/></div>  
                    <div className="area area_l3"><Area3 data={data.Cef} time={time}/></div>
                </div>
                <div className="area row row_ct" onClick={()=>{console.log("shit");setShowPvDetail(true)}}>
                    <div className='area_ct'>PV</div>
                    <div className="area_ct1"><Area4 data={data.Cef} time={time}/></div>
                    <div className="area_ct2"><Area5 data={data.Cef} time={time}/></div>
                    {/* <div className="area area_ct3"><Area6 value={find(data.Cef,{t:time})}/></div> */}
                </div>
                <div className="area_c"><MapArea bchList={findAll(data.B_ch,time)} loadList={findAll(data.Load,time)} PV_PowerList={findAll(data.PV_power,time)} /></div>
                <div className="col col_r">
                    
                    {/* <div className="area area_r2"><Area9 data={data.PV_power} time={time}/></div> */}
                    {/* <div className="area area_r2"><Area8 P_ch={data.P_ch} P_dis={data.P_dis} B_ch={data.B_ch} B_dis={data.B_dis} time={time}/></div> */}
                    <div className="area area_r3" onClick={()=>setShowCO2Detail(true)}><Area7 data={data.Total_load} time={time}/></div>
                    <div className="area area_r2"><Area10 data={data.Total_load} time={time} setShowBatteryDetail={setShowBatteryDetail}/></div>
                    
                </div>
            </div>

            <BatteryState shown={show_battery_detail} setShown={setShowBatteryDetail} item={{
                data1: data.Cef,
                data2: data.Cef,
                data3: data.Cef,
            }}/>

            <PvState shown={show_pv_detail} setShown={setShowPvDetail} item={{
                data1: data.Cef,
                data2: data.Cef,
                data3: data.Cef,
            }}/>

            <CO2State shown={show_co2_detail} setShown={setShowCO2Detail} item={{
                data1: data.Cef,
                data2: data.Cef,
                data3: data.Cef,
                data4: data.Cef,
            }}/>

        </div>
    );
}

export default App;
