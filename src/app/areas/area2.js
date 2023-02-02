import React from "react";
import demo_data from "../demo_data";
import Columns from "./area_templates/columns/Columns";
import './area2.css'

const Area2 = ({data, time}) => {

    const [load, setLoad] = React.useState("Loading");
    const [dis, setDis] = React.useState("Loading");
    const [pv, setPv] = React.useState("Loading");
    const [ addup, setAddup ] = React.useState("loading");

    const [ price_year, setPriceYear ] = React.useState("--")

    React.useEffect(()=>{
        fetch('api/price_result/').then(res=>{
            return res.json()
        }).then(data=>{
            console.log(data)
            setPriceYear(data.price_yearly)
        })
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
                <div className="area2-value1">￥{price_year}</div>
                
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