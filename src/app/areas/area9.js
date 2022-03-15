import React from "react";
import demo_data from "../demo_data";
import FilledCurve from "./area_templates/filled_curve/FilledCurve";

const Area9 = () => {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        // asyncFetch();
        demoFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
            console.log('fetch data failed', error);
        });
    };

    const demoFetch = () => {
        setData(demo_data.data9)
    }

    return (
        <FilledCurve
            title={"面积图标题"}
            data={data}
        />
    )
}

export default Area9