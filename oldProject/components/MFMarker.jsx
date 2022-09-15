import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import { Map4dContext, MarkerClusterContext } from '../context';

const MFMarker = (props) => {
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
    const markerRef = useRef()

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
            markerClusterContext?.removeMarker && markerClusterContext?.removeMarker(markerRef.current)
        }
    }, [])

    useEffect(() => {
        markerRef.current?.setPosition(position)
    }, [position])
    useEffect(() => {
        markerRef.current?.setVisible(visible)
    }, [visible])
    useEffect(() => {
        markerRef.current?.setAnchor(anchor)
    }, [anchor])
    useEffect(() => {
        markerRef.current?.setLabelAnchor(labelAnchor)
    }, [labelAnchor])
    useEffect(() => {
        markerRef.current?.setIcon(icon)
    }, [icon])
    useEffect(() => {
        markerRef.current?.setElevation(elevation)
    }, [elevation])
    useEffect(() => {
        markerRef.current?.setRotation(rotation)
    }, [rotation])
    useEffect(() => {
        markerRef.current?.setTitle(title)
    }, [title])
    useEffect(() => {
        markerRef.current?.setSnippet(snippet)
    }, [snippet])
    useEffect(() => {
        markerRef.current?.setWindowAnchor(windowAnchor)
    }, [windowAnchor])
    useEffect(() => {
        markerRef.current?.setZIndex(zIndex)
    }, [zIndex])
    useEffect(() => {
        markerRef.current?.setLabel(label)
    }, [label])
    useEffect(() => {
        markerRef.current?.setDraggable(draggable)
    }, [draggable])

    useEffect(() => {
        markerRef.current?.setIconView(iconView)
    }, [iconView])

    useEffect(() => {
        markerRef.current?.setUserInteraction(userInteractionEnabled)
    }, [userInteractionEnabled])
    return null
}
MFMarker.propTypes = {
    position: PropTypes.any.isRequired,
    visible: PropTypes.bool,
    anchor: PropTypes.any,
    labelAnchor: PropTypes.any,
    icon: PropTypes.any,
    elevation: PropTypes.number,
    rotation: PropTypes.number,
    title: PropTypes.string,
    snippet: PropTypes.string,
    windowAnchor: PropTypes.any,
    zIndex: PropTypes.number,
    label: PropTypes.any,
    draggable: PropTypes.bool,
    iconView: PropTypes.oneOfType([PropTypes.instanceOf(Node), PropTypes.string]),
    userInteractionEnabled: PropTypes.bool,
    map: PropTypes.any,
    onCreated: PropTypes.func
};
export default MFMarker
