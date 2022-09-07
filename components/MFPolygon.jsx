import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Map4dContext } from '../context';

const MFPolygon = (props) => {
    const {
        paths,
        fillColor,
        fillOpacity,
        visible = true,
        strokeColor,
        strokeWidth,
        draggable,
        elevation,
        zIndex,
        userInteractionEnabled,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const polygonRef = useRef()

    useEffect(() => {
        if (theMap && !polygonRef.current) {
            let option = {
                paths: paths,
                fillColor: fillColor,
                fillOpacity: fillOpacity,
                visible: visible,
                strokeColor: strokeColor,
                strokeWidth: strokeWidth,
                draggable: draggable,
                elevation: elevation,
                zIndex: zIndex,
                userInteractionEnabled: userInteractionEnabled,
            }
            Object.keys(option).forEach(key => {
                if (option[key] == undefined || option[key] == null) {
                    delete option[key]
                }
            })
            polygonRef.current = new map4d.Polygon(option)
            polygonRef.current?.setMap(theMap)
            onCreated && onCreated(polygonRef.current)
        }
    }, [theMap])

    useEffect(() => {
        if (theMap) {
            polygonRef.current?.setMap(theMap)         
        }
        return () => {
            polygonRef.current?.setMap(null)
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            polygonRef.current?.setMap(null)
        }
    }, [])

    useEffect(() => {
        polygonRef.current?.setPaths(paths)
    }, [paths])
    useEffect(() => {
        polygonRef.current?.setFillColor(fillColor)
    }, [fillColor])
    useEffect(() => {
        polygonRef.current?.setFillOpacity(fillOpacity)
    }, [fillOpacity])
    useEffect(() => {
        polygonRef.current?.setVisible(visible)
    }, [visible])
    useEffect(() => {
        polygonRef.current?.setStrokeColor(strokeColor)
    }, [strokeColor])
    useEffect(() => {
        polygonRef.current?.setStrokeWidth(strokeWidth)
    }, [strokeWidth])
    useEffect(() => {
        polygonRef.current?.setDraggable(draggable)
    }, [draggable])
    useEffect(() => {
        polygonRef.current?.setElevation(elevation)
    }, [elevation])
    useEffect(() => {
        polygonRef.current?.setZIndex(zIndex)
    }, [zIndex])
    useEffect(() => {
        polygonRef.current?.setUserInteraction(userInteractionEnabled)
    }, [userInteractionEnabled])

    return null
}
MFPolygon.propTypes = {
    paths: PropTypes.any.isRequired,
    fillColor: PropTypes.string,
    fillOpacity: PropTypes.number,
    visible: PropTypes.bool,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    draggable: PropTypes.number,
    elevation: PropTypes.number,
    zIndex: PropTypes.number,
    userInteractionEnabled: PropTypes.bool,
    map: PropTypes.any,
    onCreated: PropTypes.func
};
export default MFPolygon
