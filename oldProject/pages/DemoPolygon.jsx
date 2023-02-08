import React, { useState } from "react"
import { MFMap, MFPolygon } from "react-map4d-map"

const DemoPolygon = (props) => {
    const [paths, setPaths] = useState([[
        { lat: 10.771749380684138, lng: 106.70001268386841 },
        { lat: 10.768534727930506, lng: 106.70332789421082 },
        { lat: 10.770684860129196, lng: 106.70641779899597 },
        { lat: 10.77348844082262, lng: 106.70296311378479 },
        { lat: 10.771749380684138, lng: 106.70001268386841 }
    ]])
    const onMapReady1 = (map1) => {
        console.log(map1)
    }

    return (
        <>
            <div style={{ width: '80%', height: '300px' }}>
                <MFMap
                    onMapReady={onMapReady1}
                    options={{
                        center: { lat: 10.771111, lng: 106.703218 },
                        zoom: 16,
                        controls: true
                    }}
                    accessKey={demoConfig.key}
                    version={"2.4"} >
                    <MFPolygon onHover={() => { console.log("hoverPolygon") }} fillOpacity={0.1} paths={paths} />
                </MFMap>
            </div>
        </>
    )
}

DemoPolygon.propTypes = {
};

export default DemoPolygon