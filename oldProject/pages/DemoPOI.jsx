import React, { useState } from "react"
import MFMap from "../components/MFMap.jsx"
import MFPOI from "../components/MFPOI.jsx"

const DemoPOI = (props) => {

    const [post, setPost] = useState({lat: 10.774434, lng: 106.701727})

    const onMapReady1 = (map1) => {
        console.log(map1)
    }

    return (
        <>
            <div style={{ width: '80%', height: '300px' }}>
                <MFMap
                    onMapReady={onMapReady1}
                    options={{
                        center: { lat: 10.774434, lng: 106.701727 },
                        zoom: 18,
                        controls: true
                    }}
                    accessKey={demoConfig.key}
                    version={"2.3"} >
                    <MFPOI title={"Demo POI cafe"} type={"cafe"} position={post} />
                </MFMap>
            </div>
        </>
    )
}

DemoPOI.propTypes = {
};

export default DemoPOI