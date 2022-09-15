import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';

interface POIProps extends map4d.POIOptions {
    map?: map4d.Map,
    onCreated?: (poi: map4d.POI) => void
}

const MFPOI = (props: POIProps) => {
    const {
        position,
        title,
        subtitle,
        color,
        type,
        icon,
        elevation,
        zIndex,
        visible,
        draggable,
        userInteractionEnabled,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const poiRef = useRef<map4d.POI>()

    useEffect(() => {
        if (theMap && !poiRef.current) {
            let option = {
                position: position || { lat: 10.793113, lng: 106.720739 },
                title: title,
                subtitle: subtitle,
                color: color,
                type: type,
                icon: icon,
                elevation: elevation,
                zIndex: zIndex,
                visible: visible,
                draggable: draggable,
                userInteractionEnabled: userInteractionEnabled
            }
            Object.keys(option).forEach(key => {
                if (option[key] == undefined || option[key] == null) {
                    delete option[key]
                }
            })
            poiRef.current = new map4d.POI(option)
            poiRef.current?.setMap(theMap)
            onCreated && onCreated(poiRef.current)
        }
    }, [theMap])

    useEffect(() => {
        if (theMap) {
            poiRef.current?.setMap(theMap)
        }
        return () => {
            poiRef.current?.setMap(null)
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            poiRef.current?.setMap(null)
        }
    }, [])

    useEffect(() => {
        poiRef.current?.setPosition(position)
    }, [position])
    useEffect(() => {
        title != undefined && poiRef.current?.setTitle(title)
    }, [title])
    useEffect(() => {
        subtitle != undefined && poiRef.current?.setSubtitle(subtitle)
    }, [subtitle])
    useEffect(() => {
        color != undefined && poiRef.current?.setColor(color)
    }, [color])
    useEffect(() => {
        type != undefined && poiRef.current?.setType(type)
    }, [type])
    useEffect(() => {
        icon != undefined && poiRef.current?.setIcon(icon)
    }, [icon])
    useEffect(() => {
        elevation != undefined && poiRef.current?.setElevation(elevation)
    }, [elevation])
    useEffect(() => {
        zIndex != undefined && poiRef.current?.setZIndex(zIndex)
    }, [zIndex])
    useEffect(() => {
        visible != undefined && poiRef.current?.setVisible(visible)
    }, [visible])
    useEffect(() => {
        draggable != undefined && poiRef.current?.setDraggable(draggable)
    }, [draggable])
    useEffect(() => {
        userInteractionEnabled != undefined && poiRef.current?.setUserInteraction(userInteractionEnabled)
    }, [userInteractionEnabled])
    return null
}
export default MFPOI
