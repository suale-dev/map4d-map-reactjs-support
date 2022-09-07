import React, { useState } from "react"
import MFCircle from "../components/MFCircle.jsx"
import MFMap from "../components/MFMap.jsx"

const DemoCircle = (props) => {

    const [post, setPost] = useState({ lat: 10.773201, lng: 106.700147 })
    const [radius, setRadius] = useState(10)

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
                    accessKey={"208e1c99aa440d8bc2847aafa3bc0669"}
                    version={"2.3"} >
                    <MFCircle radius={radius} center={post}></MFCircle>
                </MFMap>
            </div>
        </>
    )
}

DemoCircle.propTypes = {
};

export default DemoCircle