import React from "react"
import MFMap from "../components/MFMap.jsx"
import MFTileOverlay from "../components/MFTileOverlay.jsx"

let options = {
    getUrl: function (x, y, zoom, is3dMode) {
        return `https://tile.openstreetmap.de/${zoom}/${x}/${y}.png`
    },
    visible: true,
    zIndex: 1
}
const DemoTileOverlay = (props) => {
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
                    <MFTileOverlay
                        getUrl={options.getUrl}
                        zIndex={1}
                    />
                </MFMap>
            </div>
        </>
    )
}

DemoTileOverlay.propTypes = {
};

export default DemoTileOverlay