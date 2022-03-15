import React from "react";
import demo_data from "../demo_data";
import RadarArea from "./area_templates/radar_area/RadarArea";

const Area8 = () => {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        // asyncFetch();
        demoFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/antfincdn/svFjSfJkYy/radar.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
            console.log('fetch data failed', error);
        });
    };

    const demoFetch = () => {
        setData(demo_data.data8)
    }

    return (
        <RadarArea
            title={"雷达区域标题"}
            data={data}
        />
    )
}

export default Area8