import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';

const MFGroundOverlay = (props) => {
    const {
        bounds,
        getUrl,
        override,
        visible = true,
        zIndex,
        opacity,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const groundOverlayRef = useRef()


    const reCreate = () => {
        groundOverlayRef.current?.setMap(null)
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
        groundOverlayRef.current?.setMap(theMap)
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
            groundOverlayRef.current?.setMap(null)
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            groundOverlayRef.current?.setMap(null)
        }
    }, [])

    useEffect(() => {
        if (theMap) {
            reCreate()
        }
    }, [bounds, getUrl, override])
    useEffect(() => {
        groundOverlayRef.current?.setVisible(visible)
    }, [visible])
    useEffect(() => {
        groundOverlayRef.current?.setZIndex(zIndex)
    }, [zIndex])
    useEffect(() => {
        groundOverlayRef.current?.setOpacity(opacity)
    }, [opacity])
    return null
}
MFGroundOverlay.propTypes = {
    bounds: PropTypes.any.isRequired,
    getUrl: PropTypes.func.isRequired,
    override: PropTypes.bool,
    visible: PropTypes.bool,
    zIndex: PropTypes.number,
    opacity: PropTypes.number,
    map: PropTypes.any,
    onCreated: PropTypes.func
};
export default MFGroundOverlay
