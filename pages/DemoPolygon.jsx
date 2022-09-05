import React, { useRef, useState } from "react"
import Circle from "../components/Circle.jsx"
import Map4dMap from "../components/Map4dMap.jsx"
import Polygon from "../components/Polygon.jsx"
import Polyline from "../components/Polyline.jsx"

const DemoPolygon = (props) => {

    const [map, setMap] = useState()

    const markerRef = useRef()

    const onCreatedMarker = (marker) => {
        console.log(marker)
    }
    const [post, setPost] = useState([[
        {lat: 10.771749380684138, lng: 106.70001268386841},
        {lat: 10.768534727930506, lng: 106.70332789421082},
        {lat: 10.770684860129196, lng: 106.70641779899597},
        {lat: 10.77348844082262, lng: 106.70296311378479},
        {lat: 10.771749380684138, lng: 106.70001268386841}
      ]])
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
            }}>map1</button>
            <button onClick={() => {
                setMap(mapRefs.current.map2)
            }}>map2</button>
            <div style={{ width: '80%', height: '300px' }}>
                <Map4dMap
                    onMapReady={onMapReady1}
                    options={{
                        center: { lat: 10.771111, lng: 106.703218 },
                        zoom: 16,
                        controls: true
                    }}
                    accessKey={"208e1c99aa440d8bc2847aafa3bc0669"}
                    version={"2.3"} >
                    <Polygon fillOpacity={0.1} map={map} onCreated={onCreatedMarker} paths={post} />
                </Map4dMap>
            </div>
            <div style={{ width: '80%', height: '300px' }}>
                <Map4dMap
                    onMapReady={onMapReady2}
                    options={{
                        center: { lat: 10.771111, lng: 106.703218 },
                        zoom: 16,
                        controls: true
                    }}
                    accessKey={"208e1c99aa440d8bc2847aafa3bc0669"}
                    version={"2.3"} >
                </Map4dMap>
            </div>
        </>
    )
}

DemoPolygon.propTypes = {
};

export default DemoPolygon