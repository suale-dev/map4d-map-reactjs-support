import React, { useContext, useEffect, useRef } from 'react';
import { Map4dContext, MarkerClusterContext } from '../context';

interface MarkerClusterProps extends map4d.MarkerClusterOptions {
    map?: map4d.Map,
    onCreated?: (markerCluster: map4d.MarkerClusterer) => void,
    children?: any
}

const MFMarkerCluster = (props: MarkerClusterProps) => {
    const {
        minZoom = 0,
        maxZoom = 22,
        radius = 100,
        zoomOnClick,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const markerRefs = useRef<map4d.Marker[]>([])
    const markerClusterRef = useRef<map4d.MarkerClusterer>()

    const drawCluster = () => {
        markerClusterRef.current?.setMap(null)
        if (theMap) {
            let option = {
                minZoom: minZoom,
                maxZoom: maxZoom,
                radius: radius,
                zoomOnClick: zoomOnClick
            }
            Object.keys(option).forEach(key => {
                if (option[key] == undefined || option[key] == null) {
                    delete option[key]
                }
            })
            markerClusterRef.current = new map4d.MarkerClusterer(markerRefs.current, option)
            markerClusterRef.current?.setMap(theMap)
            onCreated && onCreated(markerClusterRef.current)
        }
    }
    const clusterContext = {
        addMarker: (marker: map4d.Marker) => {
            markerRefs.current.push(marker)
            drawCluster()
        },
        removeMarker: (marker: map4d.Marker) => {
            let newMarkers = markerRefs.current.filter(t => t != marker)
            markerRefs.current = newMarkers
            drawCluster()
        }
    }

    useEffect(() => {
        if (theMap && !markerClusterRef.current) {
            drawCluster()
        }
    }, [theMap])

    useEffect(() => {
        if (theMap) {
            markerClusterRef.current?.setMap(theMap)
        }
        return () => {
            markerClusterRef.current?.setMap(null)
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            markerClusterRef.current?.setMap(null)
        }
    }, [])
    useEffect(() => {
        if (theMap) {
            drawCluster()
        }
    }, [minZoom, maxZoom, radius])
    useEffect(() => {
        zoomOnClick != undefined && markerClusterRef.current?.setZoomOnClick(zoomOnClick)
    }, [zoomOnClick])

    return (
        <MarkerClusterContext.Provider value={clusterContext}>
            {props?.children}
        </MarkerClusterContext.Provider>
    )
}
export default MFMarkerCluster
