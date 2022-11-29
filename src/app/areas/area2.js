import React from "react";
import demo_data from "../demo_data";
import Columns from "./area_templates/columns/Columns";
import './area2.css'

const Area2 = ({data, time}) => {

    const [load, setLoad] = React.useState("Loading");
    const [dis, setDis] = React.useState("Loading");
    const [pv, setPv] = React.useState("Loading");
    const [ addup, setAddup ] = React.useState("loading");

    React.useEffect(()=>{
        if(data && data.Total_load && data.PV_total &&  data.P_ch &&  data.P_dis){
            data.Total_load.forEach(d=>{
                if(d.t==time){
                    setLoad(d.value.toFixed(2))
                }
            })

            data.PV_total.forEach(d=>{
                if(d.t==time){
                    setPv(d.value.toFixed(2))
                }
            })

            let val = 0
            data.P_ch.forEach(d=>{
                if(d.t==time){
                    val -= d.value
                }
            })
            data.P_dis.forEach(d=>{
                if(d.t==time){
                    val += d.value
                }
            })
            setDis(val.toFixed(2))
        }
    },[data])

    return ( 
        <div className="FilledCurve area_layout" >
            <h3 className="area2_title" > {"节约成本"} </h3>
            <div style={{
                display:'flex',
                flexDirection:'column',
                alignItems: 'flex-start',
            }} >
                <div className="area2-title1">年度节省 </div>
                <div className="area2-value1">￥{10928.1}</div>
                
            </div>
            <div style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                width: '100%',
            }}>
                <div>
                    <div className="area2-title2">月度节省 </div>
                    <div className="area2-value2">￥{198.2}</div>
                </div>
                <div>
                    <div className="area2-title3">当日节省 </div>
                    <div className="area2-value3">￥{29.94}</div>
                </div>
            </div>
        </div>
    )
}

export default Area2