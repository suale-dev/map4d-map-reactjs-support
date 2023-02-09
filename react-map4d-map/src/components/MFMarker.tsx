import { useContext, useEffect, useRef } from 'react';
import { Map4dContext, MarkerClusterContext } from '../context';

interface IconProps {
    width: number,
    height: number,
    url: string
}
interface MarkerProps {
    position: any
    visible?: boolean
    anchor?: any
    labelAnchor?: any
    icon?: IconProps
    elevation?: number
    rotation?: number
    title?: string
    snippet?: string
    windowAnchor?: any
    zIndex?: number
    label?: any
    draggable?: boolean
    iconView?: string | Node
    userInteractionEnabled?: boolean
    map?: any,
    infoWindow?: string | Node
    infoContents?: string | Node
    showInfoWindow?: boolean
    onClick?: (marker: any) => void
    onCreated?: (marker: any) => void
    onRightClick?: (marker: any) => void
    onDragEnd?: (marker: any) => void
    onHover?: (marker: any) => void
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
        onCreated,
        onClick,
        onRightClick,
        onDragEnd,
        onHover
    } = props

    const map4dContext = useContext(Map4dContext);
    const markerClusterContext = useContext(MarkerClusterContext)

    const theMap = map || map4dContext.map
    const markerRef = useRef<any>()

    useEffect(() => {
        if (theMap && !markerRef.current) {
            let option = {
                position: position || { lat: 10.793113, lng: 106.720739 },
                visible: visible,
                anchor: anchor,
                labelAnchor: labelAnchor,
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
            } as map4d.MarkerOptions
            Object.keys(option).forEach(key => {
                if (option[key] == undefined || option[key] == null) {
                    delete option[key]
                }
            })
            if (icon) {
                let iconT = new map4d.Icon(icon.width, icon.height, icon.url)
                option.icon = iconT
            }
            markerRef.current = new map4d.Marker(option)
            if (props.infoWindow != undefined) {
                markerRef.current.setInfoWindow(props.infoWindow)
            }
            if (props.infoContents != undefined) {
                markerRef.current.setInfoContents(props.infoContents)
            }
            if (!markerClusterContext?.addMarker) {
                markerRef.current.setMap(theMap)
            }
            if (props.showInfoWindow != undefined) {
                props.showInfoWindow ? markerRef.current.showInfoWindow() : markerRef.current.hideInfoWindow()
            }
            markerRef.current.onClick = onClick
            markerRef.current.onRightClick = props.onRightClick
            markerRef.current.onDragEnd = props.onDragEnd
            markerRef.current.onHover = props.onHover
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
        if (markerRef.current) {
            markerRef.current.onHover = onHover
        }
    }, [onHover])

    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.onClick = onClick
        }
    }, [onClick])

    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.onRightClick = onRightClick
        }
    }, [onRightClick])

    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.onHover = onDragEnd
        }
    }, [onDragEnd])

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

    useEffect(() => {
        icon != undefined && markerRef.current?.setIcon(new map4d.Icon(icon.width, icon.height, icon.url))
    }, [icon])

    useEffect(() => {
        props.infoWindow != undefined && markerRef.current?.setInfoWindow(props.infoWindow)
    }, [props.infoWindow])

    useEffect(() => {
        props.infoContents != undefined && markerRef.current?.setInfoContents(props.infoContents)
    }, [props.infoContents])

    useEffect(() => {
        if (props.showInfoWindow != undefined) {
            props.showInfoWindow ? markerRef.current.showInfoWindow() : markerRef.current.hideInfoWindow()
        }
    }, [props.showInfoWindow])
    return null
}
export default MFMarker
