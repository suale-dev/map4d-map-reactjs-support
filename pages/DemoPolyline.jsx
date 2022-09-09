import React, { useState } from "react"
import MFMap from "../components/MFMap.jsx"
import MFPolyline from "../components/MFPolyline.jsx"

const DemoPolyline = (props) => {

    const [post, setPost] = useState([
        [106.699380, 10.772431],
        [106.700147, 10.773201],
        [106.700763, 10.771783],
        [106.701901, 10.772302],
        [106.701493, 10.773267],
        [106.702835, 10.773599]
    ])

    const onMapReady1 = (map1) => {
        console.log(map1)
    }

    return (
        <>
            <div style={{ width: '80%', height: '300px' }}>
                <MFMap
                    onMapReady={onMapReady1}
                    options={{
                        center: { lat: 10.773201, lng: 106.700147 },
                        zoom: 17,
                        controls: true
                    }}
                    accessKey={demoConfig.key}
                    version={"2.3"} >
                    <MFPolyline strokeColor={"#ff0000"} strokeWidth={10} path={post} />
                </MFMap>
            </div>
        </>
    )
}

DemoPolyline.propTypes = {
};

export default DemoPolyline