import React, { useRef, useState } from "react"
import Circle from "../components/Circle.jsx"
import Map4dMap from "../components/Map4dMap.jsx"

const DemoCircle = (props) => {

    const [map, setMap] = useState()

    const markerRef = useRef()

    const onCreatedMarker = (marker) => {
        console.log(marker)
    }
    const [post, setPost] = useState({ lat: 16.068500, lng: 108.221500 })
    const [radius, setRadius] = useState(10)

    const mapRefs = useRef({
        map1: null,
        map2: null
    })

    const onMapReady1 = (map1) => {
        mapRefs.current.map1 = map1
    }
    const onMapReady2 = (map2) => {
        mapRefs.current.map2 = map2
    }

    return (
        <>
            <button onClick={() => {
                setMap(mapRefs.current.map1)
                markerRef.current?.setMap(null)
                markerRef.current?.setMap(mapRefs.current.map1)
            }}>map1</button>
            <button onClick={() => {
                setMap(mapRefs.current.map2)
                markerRef.current?.setMap(null)
                markerRef.current?.setMap(mapRefs.current.map2)
            }}>map2</button>
            <div style={{ width: '80%', height: '300px' }}>
                <Map4dMap
                    onMapReady={onMapReady1}
                    options={{
                        center: { lat: 16.072163491469226, lng: 108.22690536081757 },
                        zoom: 15,
                        controls: true
                    }}
                    accessKey={"208e1c99aa440d8bc2847aafa3bc0669"}
                    version={"2.3"} >
                    <Circle map={map} radius={radius} onCreated={onCreatedMarker} center={post}></Circle>
                </Map4dMap>
            </div>
            <div style={{ width: '80%', height: '300px' }}>
                <Map4dMap
                    onMapReady={onMapReady2}
                    options={{
                        center: { lat: 16.072163491469226, lng: 108.22690536081757 },
                        zoom: 15,
                        controls: true
                    }}
                    accessKey={"208e1c99aa440d8bc2847aafa3bc0669"}
                    version={"2.3"} >
                </Map4dMap>
            </div>
        </>
    )
}

DemoCircle.propTypes = {
};

export default DemoCircle