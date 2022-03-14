import React from 'react'
// import { AreaMap } from '@ant-design/maps';
// import { Line } from '@ant-design/charts';

const MapArea = () => {

    // const [data, setData] = React.useState({ type: 'FeatureCollection', features: [] });

    // React.useEffect(() => {
    //     asyncFetch();
    // }, []);

    // const asyncFetch = () => {
    //     fetch('https://gw.alipayobjects.com/os/bmw-prod/d6da7ac1-8b4f-4a55-93ea-e81aa08f0cf3.json')
    //     .then((response) => response.json())
    //     .then((json) => setData(json))
    //     .catch((error) => {
    //         console.log('fetch data failed', error);
    //     });
    // };

    // const config = {
    //     map: {
    //       type: 'mapbox',
    //       style: 'blank',
    //       center: [120.19382669582967, 30.258134],
    //       zoom: 3,
    //       pitch: 0,
    //     },
    //     source: {
    //       data: data,
    //       parser: {
    //         type: 'geojson',
    //       },
    //     },
    //     autoFit: true,
    //     color: {
    //       field: 'adcode',
    //       value: ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(107,174,214)', 'rgb(49,130,189)', 'rgb(8,81,156)'],
    //       scale: {
    //         type: 'quantile',
    //       },
    //     },
    //     style: {
    //       opacity: 1,
    //       stroke: 'rgb(93,112,146)',
    //       lineWidth: 0.6,
    //       lineOpacity: 1,
    //     },
    //     state: {
    //       active: true,
    //     },
    //     label: {
    //       visible: true,
    //       field: 'name',
    //       style: {
    //         fill: '#000',
    //         opacity: 0.8,
    //         fontSize: 10,
    //         stroke: '#fff',
    //         strokeWidth: 1.5,
    //         textAllowOverlap: false,
    //         padding: [5, 5],
    //       },
    //     },
    //     tooltip: {
    //       items: ['name', 'adcode'],
    //     },
    //     zoom: {
    //       position: 'bottomright',
    //     },
    //     legend: {
    //       position: 'bottomleft',
    //     },
    //   };


      const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
      ];

      const config = {
        data,
        height: 400,
        xField: 'year',
        yField: 'value',
        point: {
          size: 5,
          shape: 'diamond',
        },
      };

    return (
        // <AreaMap {...config} />
        <div>
          {/* <Line {...config} /> */}
        </div>
    )
}

export default MapArea