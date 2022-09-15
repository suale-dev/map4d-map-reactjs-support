import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';
import { VariableTool } from '../tool';

interface CircleProps {
    center: map4d.ILatLng
    radius?: number
    fillColor?: string
    fillOpacity?: number
    visible?: boolean
    strokeColor?: string
    strokeWidth?: number
    draggable?: boolean
    zIndex?: number
    elevation?: number
    userInteractionEnabled?: boolean
    map?: map4d.Map
    onCreated?: (circle: map4d.Circle) => void
}

const MFCircle = (props: CircleProps) => {
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
    const circleRef = useRef<map4d.Circle>()

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
            circleRef.current?.setMap(null as unknown as map4d.Map)
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            circleRef.current?.setMap(null as unknown as map4d.Map)
        }
    }, [])

    useEffect(() => {
        if (VariableTool.hasValue(center)) {
            circleRef.current?.setCenter(center)
        }

    }, [center])
    useEffect(() => {
        if (VariableTool.hasValue(radius)) {
            circleRef.current?.setRadius(radius as number)
        }
    }, [radius])
    useEffect(() => {
        if (VariableTool.hasValue(fillColor)) {
            circleRef.current?.setFillColor(fillColor as string)
        }
    }, [fillColor])
    useEffect(() => {
        if (VariableTool.hasValue(fillOpacity)) {
            circleRef.current?.setFillOpacity(fillOpacity as number)
        }
    }, [fillOpacity])
    useEffect(() => {
        if (VariableTool.hasValue(visible)) {
            circleRef.current?.setVisible(visible as boolean)
        }
    }, [visible])
    useEffect(() => {
        if (VariableTool.hasValue(strokeColor)) {
            circleRef.current?.setStrokeColor(strokeColor as string)
        }
    }, [strokeColor])
    useEffect(() => {
        if (VariableTool.hasValue(strokeWidth)) {
            circleRef.current?.setStrokeWidth(strokeWidth as number)
        }
    }, [strokeWidth])
    useEffect(() => {
        if (VariableTool.hasValue(draggable)) {
            circleRef.current?.setDraggable(draggable as boolean)
        }
    }, [draggable])
    useEffect(() => {
        if (VariableTool.hasValue(zIndex)) {
            circleRef.current?.setZIndex(zIndex as number)
        }
    }, [zIndex])
    useEffect(() => {
        if (VariableTool.hasValue(elevation)) {
            circleRef.current?.setElevation(elevation as number)
        }
    }, [elevation])
    useEffect(() => {
        if (VariableTool.hasValue(userInteractionEnabled)) {
            circleRef.current?.setUserInteraction(userInteractionEnabled as boolean)
        }
    }, [userInteractionEnabled])

    return null
}

export default MFCircle
