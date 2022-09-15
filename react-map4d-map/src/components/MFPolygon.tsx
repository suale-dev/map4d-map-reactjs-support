import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';

interface PolygonProps extends map4d.PolygonOptions {
    map?: map4d.Map,
    onCreated: (polygon: map4d.Polygon) => void
}

const MFPolygon = (props: PolygonProps) => {
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
    const polygonRef = useRef<map4d.Polygon>()

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
        fillColor != undefined && polygonRef.current?.setFillColor(fillColor)
    }, [fillColor])
    useEffect(() => {
        fillOpacity != undefined && polygonRef.current?.setFillOpacity(fillOpacity)
    }, [fillOpacity])
    useEffect(() => {
        polygonRef.current?.setVisible(visible)
    }, [visible])
    useEffect(() => {
        strokeColor != undefined && polygonRef.current?.setStrokeColor(strokeColor)
    }, [strokeColor])
    useEffect(() => {
        strokeWidth != undefined && polygonRef.current?.setStrokeWidth(strokeWidth)
    }, [strokeWidth])
    useEffect(() => {
        draggable != undefined && polygonRef.current?.setDraggable(draggable)
    }, [draggable])
    useEffect(() => {
        elevation != undefined && polygonRef.current?.setElevation(elevation)
    }, [elevation])
    useEffect(() => {
        zIndex != undefined && polygonRef.current?.setZIndex(zIndex)
    }, [zIndex])
    useEffect(() => {
        userInteractionEnabled != undefined && polygonRef.current?.setUserInteraction(userInteractionEnabled)
    }, [userInteractionEnabled])

    return null
}
export default MFPolygon
