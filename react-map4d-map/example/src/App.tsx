import React, { useState } from "react";
import { MFMap, MFDirectionsRenderer } from "react-map4d-map";


const App = () => {
  const [show, setShow] = useState(true)
  const [option, setOption] = useState<any>()

  const a = (position: any) => {
    let route1 = [
      { lat: 16.078814, lng: 108.221592 },
      { lat: 16.078972, lng: 108.223034 },
      { lat: 16.075353, lng: 108.223513 },
    ]
    let route2 = [
      { lat: 16.078814, lng: 108.221592 },
      { lat: 16.077491, lng: 108.221735 },
      { lat: 16.077659, lng: 108.223212 },
      { lat: 16.075353, lng: 108.223513 }
    ]
    let pois = [
      { lat: 16.079774, lng: 108.220534 },
      { lat: 16.073661, lng: 108.222972 }
    ]
    let coordinateTransformer1 = new map4d.CoordinateTransformer(route1 as any)
    let coordinates1 = coordinateTransformer1.translate(position)
    let coordinateTransformer2 = new map4d.CoordinateTransformer(route2 as any)
    let coordinates2 = coordinateTransformer2.translate(position)
    let coordinateTransformer3 = new map4d.CoordinateTransformer(pois as any)
    let coordinates3 = coordinateTransformer3.translate(position)
    let option = {
      routes: [coordinates1, coordinates2],
      originMarkerOptions: {
        position: coordinates3[0],
        title: "Start",
        draggable: true,
        visible: true
      },
      destinationMarkerOptions: {
        position: coordinates3[1],
        title: "End",
        visible: true,
        draggable: true,
        clickable: false
      },

      activeOutlineWidth: 0,
      inactiveOutlineWidth: 2,
      inactiveOutlineColor: "#FF00FF",

    } as map4d.BuildingOptions
    return option
  }

  const onMapReady = () => {
    setOption(a({ lat: 16.072163491469226, lng: 108.22690536081757 }))
  }

  return (
    <>
      <div style={{ width: '80%', height: '300px' }}>
        <MFMap
          onMapReady={onMapReady}
          options={{
            center: { lat: 16.072163491469226, lng: 108.22690536081757 },
            zoom: 15
          }}
          accessKey={"208e1c99aa440d8bc2847aafa3bc0669"}
          version={"2.3"} >
          {
            show && option &&
            <MFDirectionsRenderer
              {...option}
            />
          }

        </MFMap>
        <button onClick={() => { setShow(false) }}>sfd</button>
      </div>
    </>
  )
}

export default App
