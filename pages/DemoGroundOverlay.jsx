import React, { useState } from "react"
import MFDirectionsRenderer from "../components/MFDirectionsRenderer.jsx"
import MFGroundOverlay from "../components/MFGroundOverlay.jsx"
import MFMap from "../components/MFMap.jsx"
import MFPolyline from "../components/MFPolyline.jsx"
import MFTileOverlay from "../components/MFTileOverlay.jsx"

let options = {
    getUrl: function (x, y, zoom, is3dMode) {
        return `https://a.tile.opentopomap.org/${zoom}/${x}/${y}.png`
    },
    bounds: [{ lng: 108.22125434875488, lat: 16.059547034047146 }, { lng: 108.23086738586424, lat: 16.075630202564316 }],
    override: true
}
const DemoGroundOverlay = (props) => {
    return (
        <>
            <div style={{ width: '80%', height: '400px' }}>
                <MFMap
                    options={{
                        center: { lat: 16.077279, lng: 108.222275 },
                        zoom: 16,
                        controls: true
                    }}
                    accessKey={demoConfig.key}
                    version={"2.4"} >
                    <MFGroundOverlay
                        getUrl={options.getUrl}
                        bounds={options.bounds}
                        override={options.override}
                    />
                </MFMap>
            </div>
        </>
    )
}

DemoGroundOverlay.propTypes = {
};

export default DemoGroundOverlay