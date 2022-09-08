import React from "react"
import MFMap from "../components/MFMap.jsx"
import MFMarker from "../components/MFMarker.jsx"
import MFMarkerCluster from "../components/MFMarkerCluster.jsx"

const locations = [
    [106.754497, 10.769589],
    [106.704497, 10.769589],
    [106.404497, 10.769589],
    [106.204497, 10.749589]
]
const DemoMarkerCluster = (props) => {
    return (
        <>
            <div style={{ width: '80%', height: '300px' }}>
                <MFMap
                    options={{
                        center: { lat: 10.845502, lng: 106.523784 },
                        zoom: 9,
                        controls: true
                    }}
                    accessKey={"208e1c99aa440d8bc2847aafa3bc0669"}
                    version={"2.3"} >
                    <MFMarkerCluster minZoom={0} maxZoom={10} radius={150} zoomOnClick>
                        {
                            locations?.map((loc, index) => {
                                return (
                                    <MFMarker position={loc} label={index.toString()} key={loc} />
                                )
                            })
                        }
                    </MFMarkerCluster>

                </MFMap>
            </div>
        </>
    )
}

DemoMarkerCluster.propTypes = {
};

export default DemoMarkerCluster