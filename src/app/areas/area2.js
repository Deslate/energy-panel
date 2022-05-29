import React from "react";
import demo_data from "../demo_data";
import Columns from "./area_templates/columns/Columns";

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
            <h2 > {"当前供能情况"} </h2>
            <div className="graph_container" >
                <p>当前负荷 <span>{load}</span> kW</p>
                <p>储能供电 <span>{dis}</span> kW</p>
                <p>光伏供电 <span>{pv}</span> kW</p>
                <p>电网供电 <span>{-(parseFloat(dis) + parseFloat(pv) - parseFloat(load)).toFixed(2)}</span> kW</p>
            </div>
        </div>
    )
}

export default Area2