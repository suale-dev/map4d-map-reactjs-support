import React, { useState } from "react";
import Map4dMap from "../components/MFMap.jsx";
import MFMarker from "../components/MFMarker.jsx";

const DemoMarker = (props) => {

    const [post, setPost] = useState({ lat: 16.068500, lng: 108.221500 })

    const onMapReady=(newMap)=>{
        console.log(newMap)
    }

    return (
        <>
            <div style={{ width: '80%', height: '300px' }}>
                <Map4dMap
                    onMapReady={onMapReady}
                    options={{
                        center: { lat: 16.072163491469226, lng: 108.22690536081757 },
                        zoom: 15,
                    }}
                    accessKey={"208e1c99aa440d8bc2847aafa3bc0669"}
                    version={"2.3"} >
                    <MFMarker position={post}></MFMarker>
                </Map4dMap>
            </div>
        </>
    )
}

DemoMarker.propTypes = {
};

export default DemoMarker