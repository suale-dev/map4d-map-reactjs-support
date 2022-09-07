import React, { useState } from "react"
import MFBuilding from "../components/MFBuilding.jsx"
import MFMap from "../components/MFMap.jsx"
import MFPOI from "../components/MFPOI.jsx"

const DemoBuilding = (props) => {

    const [post, setPost] = useState({ lat: 16.103254, lng: 108.214835 })

    const onMapReady1 = (map1) => {
        map1.enable3dMode(true)
    }

    return (
        <>
            <div style={{ width: '80%', height: '500px' }}>
                <MFMap
                    onMapReady={onMapReady1}
                    options={{
                        center: { lat: 16.103254, lng: 108.214835 },
                        zoom: 18,
                        tilt: 50,
                        bearing: 250,
                        controls: true
                    }}
                    accessKey={"208e1c99aa440d8bc2847aafa3bc0669"}
                    version={"2.3"} >
                    <MFBuilding
                        name={"User Building"}
                        model={"https://sw-hcm-1.vinadata.vn/v1/AUTH_d0ecabcbdcd74f6aa6ac9a5da528eb78/sdk/models/5d26e774bb542caaf439e605.obj"}
                        text={"https://sw-hcm-1.vinadata.vn/v1/AUTH_d0ecabcbdcd74f6aa6ac9a5da528eb78/sdk/textures/5d26e775bb542caaf439e607.png"}
                        position={post}
                    />
                </MFMap>
            </div>
        </>
    )
}

DemoBuilding.propTypes = {
};

export default DemoBuilding