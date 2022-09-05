import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Map4dContext } from '../context';

const Circle = (props) => {
    const {
        center,
        radius,
        fillColor,
        fillOpacity,
        visible,
        strokeColor,
        strokeWidth,
        draggable,
        zIndex,
        elevation,
        userInteractionEnabled,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const circleRef = useRef()

    useEffect(() => {
        if (theMap && !circleRef.current) {
            let option = {
                center: center || { lat: 10.793113, lng: 106.720739 },
                radius: radius,
                fillColor: fillColor,
                fillOpacity: fillOpacity,
                visible: visible,
                strokeColor: strokeColor,
                strokeWidth: strokeWidth,
                draggable: draggable,
                zIndex: zIndex,
                elevation: elevation,
                userInteractionEnabled: userInteractionEnabled,
            }
            Object.keys(option).forEach(key => {
                if (option[key] == undefined || option[key] == null) {
                    delete option[key]
                }
            })
            circleRef.current = new map4d.Circle(option)
            circleRef.current?.setMap(theMap)
            onCreated && onCreated(circleRef.current)
        }
    }, [theMap])

    useEffect(() => {
        if (theMap) {
            circleRef.current?.setMap(theMap)         
        }
        return () => {
            circleRef.current?.setMap(null)
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            circleRef.current?.setMap(null)
        }
    }, [])

    useEffect(() => {
        circleRef.current?.setCenter(center)
    }, [center])
    useEffect(() => {
        circleRef.current?.setRadius(radius)
    }, [radius])
    useEffect(() => {
        circleRef.current?.setFillColor(fillColor)
    }, [fillColor])
    useEffect(() => {
        circleRef.current?.setFillOpacity(fillOpacity)
    }, [fillOpacity])
    useEffect(() => {
        circleRef.current?.setVisible(visible)
    }, [visible])
    useEffect(() => {
        circleRef.current?.setStrokeColor(strokeColor)
    }, [strokeColor])
    useEffect(() => {
        circleRef.current?.setStrokeWidth(strokeWidth)
    }, [strokeWidth])
    useEffect(() => {
        circleRef.current?.setDraggable(draggable)
    }, [draggable])
    useEffect(() => {
        circleRef.current?.setZIndex(zIndex)
    }, [zIndex])
    useEffect(() => {
        circleRef.current?.setElevation(elevation)
    }, [elevation])
    useEffect(() => {
        circleRef.current?.setUserInteraction(userInteractionEnabled)
    }, [userInteractionEnabled])

    return null
}
Circle.propTypes = {
    center: PropTypes.any.isRequired,
    radius: PropTypes.number.isRequired,
    fillColor: PropTypes.string,
    fillOpacity: PropTypes.number,
    visible: PropTypes.bool,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    draggable: PropTypes.bool,
    zIndex: PropTypes.number,
    elevation: PropTypes.number,
    userInteractionEnabled: PropTypes.bool,
    map: PropTypes.any,
    onCreated: PropTypes.func
};
export default Circle
