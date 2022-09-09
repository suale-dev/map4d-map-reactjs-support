import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef } from 'react';
import { Map4dContext, MarkerClusterContext } from '../context';

const MFMarkerCluster = (props) => {
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
    const markerRefs = useRef([])
    const markerClusterRef = useRef()

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
        addMarker: (marker) => {
            markerRefs.current.push(marker)
            drawCluster()
        },
        removeMarker: (marker) => {
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
        markerClusterRef.current?.setZoomOnClick(zoomOnClick)
    }, [zoomOnClick])

    return (
        <MarkerClusterContext.Provider value={clusterContext}>
            {props?.children}
        </MarkerClusterContext.Provider>
    )
}
MFMarkerCluster.propTypes = {
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    radius: PropTypes.number,
    zoomOnClick: PropTypes.bool,
    map: PropTypes.any,
    onCreated: PropTypes.func
};
export default MFMarkerCluster
