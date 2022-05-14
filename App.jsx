import React from 'react';
import Map4dMap from './Map4dMap.jsx'

class App extends React.Component {
  render() {
    return (
      <div style={{ width: '100%', height: '400px' }}>
        <Map4dMap
          style={{ width: '100%', height: '200px' }}
          id={'id1'}
          onMapReady={map => console.log(map)}
          options={{
            center: { lat: 16.072163491469226, lng: 108.22690536081757 },
            zoom: 15,
            controls: true
          }}
          accessKey="YOUR_ACCESS_KEY"
          version="2.2" />
          
        <Map4dMap
          style={{ width: '100%', height: '200px' }}
          mapid = "YOUR_MAP_ID"
          id={'id2'}
          onMapReady={map => console.log(map)}
          options={{
            center: { lat: 16.072163491469226, lng: 108.22690536081757 },
            zoom: 15,
            controls: true
          }}
          accessKey="YOUR_ACCESS_KEY"
          version="2.2" />
      </div>
    );
  }
}

export default App;
