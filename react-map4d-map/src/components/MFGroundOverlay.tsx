import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';

interface GroundOverlayProps extends map4d.GroundOverlayOptions {
    map?: map4d.Map
    onCreated?: (groundOverlay: map4d.GroundOverlay) => void
}

const MFGroundOverlay = (props: GroundOverlayProps) => {
    const {
        bounds,
        getUrl,
        override,
        visible,
        zIndex,
        opacity,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const groundOverlayRef = useRef<map4d.GroundOverlay>()


    const reCreate = () => {
        groundOverlayRef.current?.setMap(null as unknown as map4d.Map)
        let option = {
            bounds,
            getUrl: getUrl,
            override,
            visible: visible,
            zIndex: zIndex,
            opacity: opacity
        }
        Object.keys(option).forEach(key => {
            if (option[key] == undefined || option[key] == null) {
                delete option[key]
            }
        })
        groundOverlayRef.current = new map4d.TileOverlay(option)
        groundOverlayRef.current?.setMap(theMap as map4d.Map)
        onCreated && onCreated(groundOverlayRef.current)
    }

    useEffect(() => {
        if (theMap && !groundOverlayRef.current) {
            reCreate()
        }
    }, [theMap])

    useEffect(() => {
        if (theMap) {
            groundOverlayRef.current?.setMap(theMap)
        }
        return () => {
            groundOverlayRef.current?.setMap(null as unknown as map4d.Map)
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            groundOverlayRef.current?.setMap(null as unknown as map4d.Map)
        }
    }, [])

    useEffect(() => {
        if (theMap) {
            reCreate()
        }
    }, [bounds, getUrl, override])
    useEffect(() => {
        visible != undefined && groundOverlayRef.current?.setVisible(visible)
    }, [visible])
    useEffect(() => {
        zIndex != undefined && groundOverlayRef.current?.setZIndex(zIndex)
    }, [zIndex])
    useEffect(() => {
        opacity != undefined && groundOverlayRef.current?.setOpacity(opacity)
    }, [opacity])
    return null
}
export default MFGroundOverlay
