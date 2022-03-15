import logo from './logo.svg';
import './App.css';
import Area1 from './areas/area1';
import Area4 from './areas/area4';
import TitleArea from './areas/title_area/TitleArea';
import MapArea from './areas/map_area/MapArea.js';
import Area8 from './areas/area8';
import Area9 from './areas/area9';

function App() {
    return (
        <div className="App">
            <div class="grid-container">
                <div class="area area_title"><TitleArea/></div>
                <div class="col col_l">
                    <div class="area area_l1"><Area1/></div>
                    <div class="area area_l2"><Area1/></div>  
                    <div class="area area_l3"><Area1/></div>
                </div>
                <div class="row row_ct">
                    <div class="area area_ct1"><Area4/></div>
                    <div class="area area_ct2"><Area4/></div>
                    <div class="area area_ct3"><Area4/></div>
                </div>
                <div class="area area_c"><MapArea/></div>
                <div class="col col_r">
                    <div class="area area_r1"><Area1/></div>
                    <div class="area area_r2"><Area8/></div>
                    <div class="area area_r3"><Area9/></div>
                </div>
            </div>
        </div>
    );
}

export default App;
