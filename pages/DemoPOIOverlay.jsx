import React from "react"
import MFMap from "../components/MFMap.jsx"
import MFPOIOverlay from "../components/MFPOIOverlay.jsx"

let options = {
    getUrl: function (x, y, zoom) {
        return `https://poi-random.herokuapp.com/poi/${zoom}/${x}/${y}`
    },
    parserData: function (response) {
        let data = JSON.parse(response)
        let places = data.pois || []
        let poiDatas = []
        places.forEach(place => {
            let poiData = {}
            poiData.id = place.id
            poiData.position = place.position
            poiData.title = place.title
            poiData.titleColor = "#0000FF"
            poiData.type = "park"
            poiDatas.push(poiData)
        })
        return poiDatas
    },
    prefixId: "poi-overlay-"
}
const DemoPOIOverlay = (props) => {
    const onMapReady=(map)=>{
        map.setPOIsEnabled(false)
    }
    return (
        <>
            <div style={{ width: '80%', height: '400px' }}>
                <MFMap
                    onMapReady={onMapReady}
                    options={{
                        center: { lat: 16.042590223437674, lng: 108.2295094493915 },
                        zoom: 16
                    }}
                    accessKey={demoConfig.key}
                    version={"2.4"} >
                    <MFPOIOverlay
                        getUrl={options.getUrl}
                        parserData={options.parserData}
                        prefixId={options.prefixId}
                    />
                </MFMap>
            </div>
        </>
    )
}

DemoPOIOverlay.propTypes = {
};

export default DemoPOIOverlay