import React, { useRef, useState } from "react";
import Map4dMap from "../components/Map4dMap.jsx";
import Marker from "../components/Marker.jsx";

const DemoMarker = (props) => {

    const [map, setMap] = useState()
    const markerRef = useRef()

    const onCreatedMarker = (marker) => {
        console.log(marker)
    }
    const [post, setPost] = useState({ lat: 16.068500, lng: 108.221500 })
    const mapRefs = useRef({
        map1: null,
        map2: null
    })

    const onMapReady2 = (map2) => {
        mapRefs.current.map2 = map2
    }

    const onMapReady=(newMap)=>{
        mapRefs.current.map1 = newMap
    }

    return (
        <>
            <button onClick={() => {
                setMap(mapRefs.current.map1)
            }}>map1</button>
            <button onClick={() => {
                setMap(mapRefs.current.map2)
            }}>map2</button>
            <div style={{ width: '80%', height: '300px' }}>
                <Map4dMap
                    onMapReady={onMapReady}
                    options={{
                        center: { lat: 16.072163491469226, lng: 108.22690536081757 },
                        zoom: 15,
                    }}
                    accessKey={"208e1c99aa440d8bc2847aafa3bc0669"}
                    version={"2.3"} >
                    <Marker map={map} onCreated={onCreatedMarker} position={post}></Marker>
                </Map4dMap>
            </div>
            <div style={{ width: '80%', height: '300px' }}>
                <Map4dMap
                    onMapReady={onMapReady2}
                    options={{
                        center: { lat: 16.072163491469226, lng: 108.22690536081757 },
                        zoom: 15,
                    }}
                    accessKey={"208e1c99aa440d8bc2847aafa3bc0669"}
                    version={"2.3"} >
                </Map4dMap>
            </div>
        </>
    )
}

DemoMarker.propTypes = {
};

export default DemoMarker