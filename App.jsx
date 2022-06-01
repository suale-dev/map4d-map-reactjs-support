import React, { useState } from 'react';
import Map4dMap from './Map4dMap.jsx'

function App() {
  const [maps, setMaps] = useState([])
  const [version, setVersion] = useState("")
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

  const onMapReady = (map) => {
    console.log("Map is created")
    //TODO: Map interaction from here
  }

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <input placeholder='version' onChange={changeVersion} />
      <input placeholder='key' onChange={changeKey} />
      <input placeholder='id' onChange={changeId} />
      <button onClick={add}>Thêm map</button>
      <button onClick={remove}>Xóa map cuối</button>
      {
        maps.map(map => {
          return (
            <Map4dMap
              key={map.id}
              style={{ width: '100%', height: '200px' }}
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
