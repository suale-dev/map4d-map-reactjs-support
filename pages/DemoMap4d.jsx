import React, { useRef, useState } from "react"
import Map4dMap from "../components/Map4dMap.jsx"

const DemoMap4d = (props) => {
    const [maps, setMaps] = useState([])
    const [version, setVersion] = useState("2.4")
    const [key, setKey] = useState("")
    const [map, setMap] = useState(null)

    const markerRef = useRef()

    const changeVersion = (e) => {
        let newValue = e.target.value
        setVersion(newValue)
    }
    const changeKey = (e) => {
        let newValue = e.target.value
        setKey(newValue)
    }
    const add = () => {
        setMaps(prev => {
            let newMaps = [...prev]
            newMaps.push({
                key: key,
                version: version
            })
            return newMaps
        })
    }
    const remove = () => {
        setMaps(prev => {
            let newMaps = [...prev]
            newMaps.pop()
            return newMaps
        })
    }
    const onMapReady = (newMap, id) => {
        console.log(`Map with id ${id} is created`)
        //TODO: Map interaction from here
        let centerMap = map.getCamera().getTarget()
        let marker = new map4d.Marker({
            position: centerMap,
            anchor: [0.5, 1.0],
            label: new map4d.MarkerLabel({ text: "Demo Marker", color: "FF00FF", fontSize: 12 })
        })
        // Thêm marker vào bản đồ
        marker.setMap(map)
        let option = {
            position: position || { lat: 10.793113, lng: 106.720739 },
        }
        Object.keys(option).forEach(key => {
            if (option[key] == undefined || option[key] == null) {
                delete option[key]
            }
        })
        markerRef.current = new map4d.Marker(option)
        markerRef.current?.setMap(newMap)
    }
    return (
        <div style={{ width: '80%', height: '400px' }}>
            <input placeholder='version' value={2.4} onChange={changeVersion} />
            <input placeholder='key' onChange={changeKey} />
            <button onClick={add}>Thêm map</button>
            <button onClick={remove}>Xóa map cuối</button>
            {
                maps.map(map => {
                    return (
                        <Map4dMap
                          key={map.key}
                          onMapReady={onMapReady}
                          options={{
                            center: { lat: 16.072163491469226, lng: 108.22690536081757 },
                            zoom: 15,
                            controls: true
                          }}
                          accessKey={map.key}
                          version={map.version} />
                    )
                })
            }
        </div>
    )
}
export default DemoMap4d