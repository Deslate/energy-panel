import React from 'react'
import * as echarts from 'echarts/lib/echarts.js'
import 'echarts/lib/component/geo';
import 'echarts/lib/chart/lines';
import 'echarts/lib/chart/effectScatter';
import shenzhen from './深圳市.js'
import { LegendComponent } from 'echarts/components';
echarts.use([LegendComponent])

const RandomNumBoth = (direction, seed) => {
    let Min
    let Max

    // let x = Math.random()*5
    if (direction === 'x') {
        Min = seed<1?
            1138245:seed<2?
            1139595:seed<3?
            1140995:seed<4.5?
            1141995:seed<5.5?
            1142995:seed<6.5?
            1144800:
            1138645
        Max = seed<1?
            1139595:seed<2?
            1140995:seed<3?
            1142995:seed<4.5?
            1144095:seed<5.5?
            1145895:seed<6.5?
            1145595:
            1139446
    } else if (direction === 'y') {
        Min = seed<1?
            225824:seed<2?
            225224:seed<3?
            225624:seed<4.5?
            226552:seed<5.5?
            225982:seed<6.5?
            224582:
            224582
        Max = seed<1?
            228052:seed<2?
            227552:seed<3?
            226552:seed<4.5?
            227552:seed<5.5?
            226552:seed<6.5?
            225982:
            225882
    }
    let Range = Max - Min;
    let Rand = Math.random();
    let num = Min + Math.round(Rand * Range); //四舍五入

    if (direction === 'x') {
        num = num * 0.0001
    } else if (direction === 'y') {
        num = num * 0.0001
    }
    return parseFloat(num.toFixed(4));
}


const MapArea = ({ bchList ,loadList,PV_PowerList}) => {

    const [ locations, setLocations ] = React.useState({bch:[],load:[],PV_Power:[]})

    const [ zoom, setZoom ] = React.useState(1)

    const generateLocations = () => {
        let _locations = {}

        _locations.bch = []
        for (let i in bchList) {
            let seed = Math.random() * 7;
            _locations.bch.push({
                value: [RandomNumBoth('x', seed), RandomNumBoth('y', seed)],
            })
        }

        _locations.load = []
        for (let i in loadList) {
            let seed = Math.random() * 7;
            _locations.load.push({
                value: [RandomNumBoth('x', seed), RandomNumBoth('y', seed)],
            })
        }

        _locations.PV_Power = []
        for (let i in PV_PowerList) {
            let seed = Math.random() * 7;
            _locations.PV_Power.push({
                value: [RandomNumBoth('x', seed), RandomNumBoth('y', seed)],
            })
        }

        setLocations(_locations)
    }

    React.useEffect(() => {

        if (bchList == null || loadList == null ||PV_PowerList == null) return

        if(locations.bch.length<=0){
            generateLocations()
            return
        }

        let bchLine = []
        for (let i in bchList) {

            if (bchList[i].value == 0) {
                bchLine.push({
                    coords: [
                        locations.bch[i]["value"],
                        [114.064696, 22.549324]

                    ]
                })
            } else {
                bchLine.push({
                    coords: [
                        [114.064696, 22.549324],
                        locations.bch[i]["value"]
                    ]
                })
            }

        }

        let loadLine = []
        for (let i in loadList) {

            if (loadList[i].value == 0) {
                loadLine.push({
                    coords: [
                        locations.load[i]["value"],
                        [114.064696, 22.549324]

                    ]
                })
            } else {
                loadLine.push({
                    coords: [
                        [114.064696, 22.549324],
                        locations.load[i]["value"]
                    ]
                })
            }

        }

        let PV_PowerLine = []
        for (let i in PV_PowerList) {
            if (PV_PowerList[i].value == 0) {
                PV_PowerLine.push({
                    coords: [
                        [114.064696, 22.549324],
                        locations.PV_Power[i]["value"],
                    ]
                })
            } else {
                PV_PowerLine.push({
                    coords: [
                        locations.PV_Power[i]["value"],
                        [114.064696, 22.549324],
                    ]
                })
            }

        }

        let { bch, load, PV_Power } = locations


        let map = echarts.init(document.getElementById('container'))

        let rate = zoom / 20 > 1 ? 1 : zoom / 20

        echarts.registerMap("shenzhen", shenzhen);
        map.setOption({
            label: {
                show: false
            },
            geo: [{

                map: 'shenzhen',
                zoom: zoom,
                roam: true,
                itemStyle: {
                    borderColor: "#333b42",
                    areaColor: '#333b42',

                },

                emphasis: {
                    itemStyle: {
                        borderColor: "#333b42",
                        areaColor: "#333b42"
                    },
                    label: {
                        show: false,
                        color: "#333b42"
                    }
                },

            }],
            legend: {
                textStyle:{
                    color: '#fff'
                },
                data: ['储能设备', '负荷设备', '光伏设备'],
            },
            series: [{
                name: 'center',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    show: false
                },
                symbolSize: 15,
                itemStyle: {
                    shadowBlur: 10,
                },
                data: [{
                    "value": [114.064696, 22.549324],
                }],

            }, {
                name: 'B_ch',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    show: false
                },
                itemStyle: {
                    shadowBlur: 1,
                    color: '#91cc75'
                },
                symbolSize: 3,
                data: bch.slice(0, bch.length * rate),
            }, {
                name: '储能设备',
                type: 'lines',
                zlevel: 1,
                symbol: ['none', 'none'],
                symbolSize: 10,
                effect: {
                    show: true,
                    period: 5,
                    trailLength: 0.1,
                    symbol: 'arrow',
                    symbolSize: 2
                },
                lineStyle: {
                    normal: {
                        color: '#91cc75',
                        width: 1,
                        opacity: 0.1,
                        curveness: 0.3
                    }
                },
                data: bchLine.slice(0, bchLine.length * rate),
            }, {
                name: 'load',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    show: false
                },
                itemStyle: {
                    shadowBlur: 1,
                    color: '#6298af',
                },
                symbolSize: 3,
                data: load.slice(0, load.length * rate),
            }, {
                name: '负荷设备',
                type: 'lines',
                zlevel: 1,
                symbol: ['none', 'none'],
                symbolSize: 10,
                effect: {
                    show: true,
                    period: 5,
                    trailLength: 0.1,
                    symbol: 'arrow',
                    symbolSize: 2
                },
                lineStyle: {
                    normal: {
                        color: '#6298af',
                        width: 1,
                        opacity: 0.1,
                        curveness: 0.3
                    }
                },
                data: loadLine.slice(0, loadLine.length * rate),
            }, {
                name: 'PV_Power',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    show: false
                },
                itemStyle: {
                    shadowBlur: 1,
                    color: '#a28d4d',
                },
                symbolSize: 3,
                data: PV_Power.slice(0, PV_Power.length * rate),
            }, {
                name: '光伏设备',
                type: 'lines',
                zlevel: 1,
                symbol: ['none', 'none'],
                symbolSize: 10,
                effect: {
                    show: true,
                    period: 5,
                    trailLength: 0.1,
                    symbol: 'arrow',
                    symbolSize: 2
                },
                lineStyle: {
                    normal: {
                        color: '#a28d4d',
                        width: 1,
                        opacity: 0.1,
                        curveness: 0.3
                    }
                },
                data: PV_PowerLine.slice(0, PV_PowerLine.length * rate),
            }],
            dataZoom: []
        })

        map.on('georoam', function (params) {
            let option = map.getOption();
            let zoom = option.geo[0].zoom; 
            console.log(zoom)
            setZoom(zoom)
        });

        window.onresize = function () {
            map.resize();
        }


    }, [bchList,loadList,PV_PowerList, locations, zoom])


    return (
        // <AreaMap {...config} />
        <div id="container" style={{ width: "calc(100% - 4px)", height: "calc(100% - 4px)", marginTop: 2, marginLeft: 2 }}></div>
        // <div id="container" className='container' style={{ width: "calc(100% - 4px)", height: "calc(100% - 4px)", marginTop: 2, marginLeft: 2 }}>
        //     {/* <Line {...config} /> */}
        //     {/* <AreaMap {...config} /> */}
        // </div>
    )
}

export default MapArea