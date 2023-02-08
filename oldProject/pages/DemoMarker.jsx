import React, { useState } from "react";
import { MFMap, MFMarker } from "react-map4d-map"

const DemoMarker = (props) => {

    const [post, setPost] = useState({ lat: 16.068500, lng: 108.221500 })

    const onMapReady = (newMap) => {
        console.log(newMap)
    }

    return (
        <>
            <div style={{ width: '80%', height: '300px' }}>
                <MFMap
                    onMapReady={onMapReady}
                    options={{
                        center: { lat: 16.072163491469226, lng: 108.22690536081757 },
                        zoom: 15,
                    }}
                    accessKey={demoConfig.key}
                    version={"2.3"} >
                    <MFMarker onHover={() => { console.log("hoverMarker") }} position={post}></MFMarker>
                    <MFMarker onClick={() => { console.log("sdfs2") }} position={{ lat: 16.078500, lng: 108.221500 }}></MFMarker>
                    <MFMarker snippet="adsd" title="ád" label={"test"} onDragEnd={() => { console.log("drag") }} draggable={true} onClick={() => { console.log("sdfs4") }} position={{ lat: 16.088500, lng: 108.221500 }}></MFMarker>
                </MFMap>
            </div>
        </>
    )
}

DemoMarker.propTypes = {
};

export default DemoMarker