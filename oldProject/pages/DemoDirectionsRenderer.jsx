import React, { useState } from "react"
import { MFDirectionsRenderer, MFMap } from "react-map4d-map"

const option = {
    routes: [
        [
            { lat: 16.078814, lng: 108.221592 },
            { lat: 16.078972, lng: 108.223034 },
            { lat: 16.075353, lng: 108.223513 },
        ],
        [
            { lat: 16.078814, lng: 108.221592 },
            { lat: 16.077491, lng: 108.221735 },
            { lat: 16.077659, lng: 108.223212 },
            { lat: 16.075353, lng: 108.223513 }
        ]
    ],
    originMarkerOptions: {
        position: { lat: 16.079774, lng: 108.220534 },
        title: "Start",
        draggable: true,
        visible: true
    },
    destinationMarkerOptions: {
        position: { lat: 16.073661, lng: 108.222972 },
        title: "End",
        visible: true,
        draggable: true,
        userInteractionEnabled: false
    },

    activeOutlineWidth: 0,
    inactiveOutlineWidth: 2,
    inactiveOutlineColor: "#FF00FF",
}

const DemoDirectionsRenderer = (props) => {
    const [show, setShow] = useState(true)
    const [routes, setRoutes] = useState(option.routes)
    return (
        <>
            <div style={{ width: '80%', height: '300px' }}>
                <MFMap
                    options={{
                        center: { lat: 16.077279, lng: 108.222275 },
                        zoom: 16,
                        controls: true
                    }}
                    accessKey={demoConfig.key}
                    version={"2.4"} >
                    {
                        show &&
                        <MFDirectionsRenderer
                            onHover={() => { console.log("hoverRenderer") }}
                            routes={routes}
                            originMarkerOptions={option.originMarkerOptions}
                            destinationMarkerOptions={option.destinationMarkerOptions}
                            activeOutlineWidth={option.activeOutlineWidth}
                            inactiveOutlineWidth={option.inactiveOutlineWidth}
                            inactiveOutlineColor={option.inactiveOutlineColor}
                        />
                    }

                </MFMap>
            </div>
            <button onClick={() => {
                setRoutes([
                    [
                        { lat: 16.078814, lng: 108.221592 },
                        { lat: 16.078972, lng: 108.223034 },
                        { lat: 16.075353, lng: 108.223513 },
                    ]
                ])
            }}>hide</button>
        </>
    )
}

DemoDirectionsRenderer.propTypes = {
};

export default DemoDirectionsRenderer