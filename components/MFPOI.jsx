import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';

const MFPOI = (props) => {
    const {
        position,
        title,
        subtitle,
        color,
        type,
        icon,
        elevation,
        zIndex,
        visible = true,
        draggable,
        userInteractionEnabled,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const poiRef = useRef()

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
        poiRef.current?.setTitle(title)
    }, [title])
    useEffect(() => {
        poiRef.current?.setSubtitle(subtitle)
    }, [subtitle])
    useEffect(() => {
        poiRef.current?.setAnchor(color)
    }, [color])
    useEffect(() => {
        poiRef.current?.setType(type)
    }, [type])
    useEffect(() => {
        poiRef.current?.setIcon(icon)
    }, [icon])
    useEffect(() => {
        poiRef.current?.setElevation(elevation)
    }, [elevation])
    useEffect(() => {
        poiRef.current?.setZIndex(zIndex)
    }, [zIndex])
    useEffect(() => {
        poiRef.current?.setVisible(visible)
    }, [visible])
    useEffect(() => {
        poiRef.current?.setDraggable(draggable)
    }, [draggable])
    useEffect(() => {
        poiRef.current?.setUserInteraction(userInteractionEnabled)
    }, [userInteractionEnabled])
    return null
}
MFPOI.propTypes = {
    position: PropTypes.any.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    color: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.string,
    elevation: PropTypes.number,
    zIndex: PropTypes.number,
    visible: PropTypes.bool,
    draggable: PropTypes.bool,
    userInteractionEnabled: PropTypes.bool,
    map: PropTypes.any,
    onCreated: PropTypes.func
};
export default MFPOI
