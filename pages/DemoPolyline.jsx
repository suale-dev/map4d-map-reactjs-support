import React, { useRef, useState } from "react"
import Circle from "../components/Circle.jsx"
import Map4dMap from "../components/Map4dMap.jsx"
import Polyline from "../components/Polyline.jsx"

const DemoPolyline = (props) => {

    const [map, setMap] = useState()

    const markerRef = useRef()

    const onCreatedMarker = (marker) => {
        console.log(marker)
    }
    const [post, setPost] = useState([
        [106.699380, 10.772431],
        [106.700147, 10.773201],
        [106.700763, 10.771783],
        [106.701901, 10.772302],
        [106.701493, 10.773267],
        [106.702835, 10.773599]
    ])
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
                        center: { lat: 10.773201, lng: 106.700147 },
                        zoom: 17,
                        controls: true
                    }}
                    accessKey={"208e1c99aa440d8bc2847aafa3bc0669"}
                    version={"2.3"} >
                    <Polyline strokeColor={"#ff0000"} strokeWidth={10} map={map} onCreated={onCreatedMarker} path={post} />
                </Map4dMap>
            </div>
            <div style={{ width: '80%', height: '300px' }}>
                <Map4dMap
                    onMapReady={onMapReady2}
                    options={{
                        center: { lat: 10.773201, lng: 106.700147 },
                        zoom: 17,
                        controls: true
                    }}
                    accessKey={"208e1c99aa440d8bc2847aafa3bc0669"}
                    version={"2.3"} >
                </Map4dMap>
            </div>
        </>
    )
}

DemoPolyline.propTypes = {
};

export default DemoPolyline