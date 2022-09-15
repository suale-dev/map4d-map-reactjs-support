import { useContext, useEffect, useRef } from 'react';
import { Map4dContext, MarkerClusterContext } from '../context';

interface MarkerProps extends map4d.MarkerOptions {
    map?: map4d.Map
    onCreated: (marker: map4d.Marker) => void
}

const MFMarker = (props: MarkerProps) => {
    const {
        position,
        visible = true,
        anchor,
        labelAnchor,
        icon,
        elevation,
        rotation,
        title,
        snippet,
        windowAnchor,
        zIndex,
        label,
        draggable,
        iconView,
        userInteractionEnabled,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const markerClusterContext = useContext(MarkerClusterContext)

    const theMap = map || map4dContext.map
    const markerRef = useRef<map4d.Marker>()

    useEffect(() => {
        if (theMap && !markerRef.current) {
            let option = {
                position: position || { lat: 10.793113, lng: 106.720739 },
                visible: visible,
                anchor: anchor,
                labelAnchor: labelAnchor,
                icon: icon,
                elevation: elevation,
                rotation: rotation,
                title: title,
                snippet: snippet,
                windowAnchor: windowAnchor,
                zIndex: zIndex,
                label: label,
                draggable: draggable,
                iconView: iconView,
                userInteractionEnabled: userInteractionEnabled
            }
            Object.keys(option).forEach(key => {
                if (option[key] == undefined || option[key] == null) {
                    delete option[key]
                }
            })
            markerRef.current = new map4d.Marker(option)
            if (!markerClusterContext?.addMarker) {
                markerRef.current?.setMap(theMap)
            }
            onCreated && onCreated(markerRef.current)
            markerClusterContext?.addMarker && markerClusterContext?.addMarker(markerRef.current)
        }
    }, [theMap])

    useEffect(() => {
        if (theMap) {
            if (!markerClusterContext?.addMarker) {
                markerRef.current?.setMap(theMap)
            }
        }
        return () => {
            if (!markerClusterContext?.addMarker) {
                markerRef.current?.setMap(null)
            }
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            if (!markerClusterContext?.addMarker) {
                markerRef.current?.setMap(null)
            }
            markerRef.current && markerClusterContext?.removeMarker && markerClusterContext?.removeMarker(markerRef.current)
        }
    }, [])

    useEffect(() => {
        markerRef.current?.setPosition(position)
    }, [position])
    useEffect(() => {
        markerRef.current?.setVisible(visible)
    }, [visible])
    useEffect(() => {
        anchor != undefined && markerRef.current?.setAnchor(anchor)
    }, [anchor])
    useEffect(() => {
        labelAnchor != undefined && markerRef.current?.setLabelAnchor(labelAnchor)
    }, [labelAnchor])
    useEffect(() => {
        icon != undefined && markerRef.current?.setIcon(icon)
    }, [icon])
    useEffect(() => {
        elevation != undefined && markerRef.current?.setElevation(elevation)
    }, [elevation])
    useEffect(() => {
        rotation != undefined && markerRef.current?.setRotation(rotation)
    }, [rotation])
    useEffect(() => {
        title != undefined && markerRef.current?.setTitle(title)
    }, [title])
    useEffect(() => {
        snippet != undefined && markerRef.current?.setSnippet(snippet)
    }, [snippet])
    useEffect(() => {
        windowAnchor != undefined && markerRef.current?.setWindowAnchor(windowAnchor)
    }, [windowAnchor])
    useEffect(() => {
        zIndex != undefined && markerRef.current?.setZIndex(zIndex)
    }, [zIndex])
    useEffect(() => {
        label != undefined && markerRef.current?.setLabel(label)
    }, [label])
    useEffect(() => {
        draggable != undefined && markerRef.current?.setDraggable(draggable)
    }, [draggable])

    useEffect(() => {
        iconView != undefined && markerRef.current?.setIconView(iconView)
    }, [iconView])

    useEffect(() => {
        userInteractionEnabled != undefined && markerRef.current?.setUserInteraction(userInteractionEnabled)
    }, [userInteractionEnabled])
    return null
}
export default MFMarker
