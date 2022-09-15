import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';

interface PolylineProps extends map4d.PolylineOptions {
    map?: map4d.Map,
    onCreated?: (polyline: map4d.Polyline) => void
}

const MFPolyline = (props: PolylineProps) => {
    const {
        path,
        strokeWidth,
        strokeColor,
        strokeOpacity,
        visible = true,
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
    const polylineRef = useRef<map4d.Polyline>()

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
        strokeWidth != undefined && polylineRef.current?.setStrokeWidth(strokeWidth)
    }, [strokeWidth])
    useEffect(() => {
        strokeColor != undefined && polylineRef.current?.setStrokeColor(strokeColor)
    }, [strokeColor])
    useEffect(() => {
        strokeOpacity != undefined && polylineRef.current?.setStrokeOpacity(strokeOpacity)
    }, [strokeOpacity])
    useEffect(() => {
        visible != undefined && polylineRef.current?.setVisible(visible)
    }, [visible])
    useEffect(() => {
        closed != undefined && polylineRef.current?.setClosed(closed)
    }, [closed])
    useEffect(() => {
        draggable != undefined && polylineRef.current?.setDraggable(draggable)
    }, [draggable])
    useEffect(() => {
        zIndex != undefined && polylineRef.current?.setZIndex(zIndex)
    }, [zIndex])
    useEffect(() => {
        elevation != undefined && polylineRef.current?.setElevation(elevation)
    }, [elevation])
    useEffect(() => {
        strokePattern != undefined && polylineRef.current?.setStrokePattern(strokePattern)
    }, [strokePattern])
    useEffect(() => {
        userInteractionEnabled != undefined && polylineRef.current?.setUserInteraction(userInteractionEnabled)
    }, [userInteractionEnabled])

    return null
}
export default MFPolyline
