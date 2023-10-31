import React, { useState } from "react";
import { MFMap, MFMarker } from "react-map4d-map"

const DemoMarker = (props) => {

    const [post, setPost] = useState({ lat: 16.068500, lng: 108.221500 })

    const onMapReady = (newMap) => {
        console.log(newMap)
    }

    const [mapType, setMapType] = useState({
        center: { lat: 16.072163491469226, lng: 108.22690536081757 },
        zoom: 15,
        mapType: "roadmap"
    })

    return (
        <>
            <div style={{ width: '80%', height: '300px' }}>
                <MFMap
                    onMapReady={onMapReady}
                    options={mapType}
                    accessKey={demoConfig.key}
                    version={"2.3"} >
                    <MFMarker onHover={() => { console.log("hoverMarker") }} position={post}></MFMarker>
                    <MFMarker onClick={() => { console.log("sdfs2") }} position={{ lat: 16.078500, lng: 108.221500 }}></MFMarker>
                    <MFMarker snippet="adsd" title="ád" label={"test"} onDragEnd={() => { console.log("drag") }} draggable={true} onClick={() => { console.log("sdfs4") }} position={{ lat: 16.088500, lng: 108.221500 }}></MFMarker>
                </MFMap>
                <button onClick={()=>{setMapType({
        center: { lat: 16.072163491469226, lng: 108.22690536081757 },
        zoom: 15,
        mapType: "raster"
    })}}>sfd</button>
            </div>
        </>
    )
}

DemoMarker.propTypes = {
};

export default DemoMarker