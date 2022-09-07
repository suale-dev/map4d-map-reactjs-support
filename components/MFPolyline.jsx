import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Map4dContext } from '../context';

const MFPolyline = (props) => {
    const {
        path,
        strokeWidth,
        strokeColor,
        strokeOpacity,
        visible,
        closed,
        draggable,
        zIndex,
        elevation,
        strokePattern,
        userInteractionEnabled,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const polylineRef = useRef()

    useEffect(() => {
        if (theMap && !polylineRef.current) {
            let option = {
                path: path || { lat: 10.793113, lng: 106.720739 },
                strokeWidth: strokeWidth,
                strokeColor: strokeColor,
                strokeOpacity: strokeOpacity,
                visible: visible,
                closed: closed,
                draggable: draggable,
                zIndex: zIndex,
                elevation: elevation,
                strokePattern: strokePattern,
                userInteractionEnabled: userInteractionEnabled,
            }
            Object.keys(option).forEach(key => {
                if (option[key] == undefined || option[key] == null) {
                    delete option[key]
                }
            })
            polylineRef.current = new map4d.Polyline(option)
            polylineRef.current?.setMap(theMap)
            onCreated && onCreated(polylineRef.current)
        }
    }, [theMap])

    useEffect(() => {
        if (theMap) {
            polylineRef.current?.setMap(theMap)         
        }
        return () => {
            polylineRef.current?.setMap(null)
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            polylineRef.current?.setMap(null)
        }
    }, [])

    useEffect(() => {
        polylineRef.current?.setPath(path)
    }, [path])
    useEffect(() => {
        polylineRef.current?.setStrokeWidth(strokeWidth)
    }, [strokeWidth])
    useEffect(() => {
        polylineRef.current?.setStrokeColor(strokeColor)
    }, [strokeColor])
    useEffect(() => {
        polylineRef.current?.setStrokeOpacity(strokeOpacity)
    }, [strokeOpacity])
    useEffect(() => {
        polylineRef.current?.setVisible(visible)
    }, [visible])
    useEffect(() => {
        polylineRef.current?.setClosed(closed)
    }, [closed])
    useEffect(() => {
        polylineRef.current?.setDraggable(draggable)
    }, [draggable])
    useEffect(() => {
        polylineRef.current?.setZIndex(zIndex)
    }, [zIndex])
    useEffect(() => {
        polylineRef.current?.setElevation(elevation)
    }, [elevation])
    useEffect(() => {
        polylineRef.current?.setStrokePattern(strokePattern)
    }, [strokePattern])
    useEffect(() => {
        polylineRef.current?.setUserInteraction(userInteractionEnabled)
    }, [userInteractionEnabled])

    return null
}
MFPolyline.propTypes = {
    path: PropTypes.any.isRequired,
    strokeWidth: PropTypes.number,
    strokeColor: PropTypes.string,
    strokeOpacity: PropTypes.number,
    visible: PropTypes.bool,
    closed: PropTypes.bool,
    draggable: PropTypes.bool,
    zIndex: PropTypes.number,
    elevation: PropTypes.number,
    strokePattern: PropTypes.any,
    userInteractionEnabled: PropTypes.bool,
    map: PropTypes.any,
    onCreated: PropTypes.func
};
export default MFPolyline
