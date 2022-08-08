import React, { useState } from 'react';
import Map4dMap from './Map4dMap.jsx'

function App() {
  const [maps, setMaps] = useState([])
  const [version, setVersion] = useState("2.4")
  const [key, setKey] = useState("")
  const [id, setId] = useState("")
  const changeVersion = (e) => {
    let newValue = e.target.value
    setVersion(newValue)
  }
  const changeKey = (e) => {
    let newValue = e.target.value
    setKey(newValue)
  }
  const changeId = (e) => {
    let newValue = e.target.value
    setId(newValue)
  }
  const add = () => {
    setMaps(prev => {
      let newMaps = [...prev]
      newMaps.push({
        key: key,
        id: id,
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

  const onMapReady = (map, id) => {
    console.log(`Map with id ${id} is created`)
    //TODO: Map interaction from here
    let centerMap = map.getCamera().getTarget()
    let marker = new map4d.Marker({
      position: centerMap,
      anchor: [0.5, 1.0],
      label: new map4d.MarkerLabel({text: "Demo Marker", color: "FF00FF", fontSize: 12})
    })
    // Thêm marker vào bản đồ
    marker.setMap(map)
  }

  return (
    <div style={{ width: '80%', height: '400px' }}>
      <input placeholder='version' value={2.4} onChange={changeVersion} />
      <input placeholder='key' onChange={changeKey} />
      <input placeholder='id' onChange={changeId} />
      <button onClick={add}>Thêm map</button>
      <button onClick={remove}>Xóa map cuối</button>
      {
        maps.map(map => {
          return (
            <Map4dMap
              key={map.id}
              id={map.id}
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
  );
}

export default App;
