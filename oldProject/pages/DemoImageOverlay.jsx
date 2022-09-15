import React from "react"
import MFImageOverlay from "../components/MFImageOverlay.jsx"
import MFMap from "../components/MFMap.jsx"

let options = {
    url: `https://cdn.glitch.com/4c9ebeb9-8b9a-4adc-ad0a-238d9ae00bb5%2Fmdn_logo-only_color.svg?1535749917189`,
    bounds: [{lng: 108.214421, lat: 16.061733}, {lng: 108.23086738586424, lat: 16.075630202564316}],
    zIndex: 1
  }
const DemoImageOverlay = (props) => {
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
                    <MFImageOverlay
                        url={options.url}
                        bounds={options.bounds}
                        zIndex={options.zIndex}
                    />
                </MFMap>
            </div>
        </>
    )
}

DemoImageOverlay.propTypes = {
};

export default DemoImageOverlay