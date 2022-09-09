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
    const tileOverlayRef = useRef()


    const reCreate = () => {
        tileOverlayRef.current?.setMap(null)
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
        tileOverlayRef.current = new map4d.TileOverlay(option)
        tileOverlayRef.current?.setMap(theMap)
        onCreated && onCreated(tileOverlayRef.current)
    }

    useEffect(() => {
        if (theMap && !tileOverlayRef.current) {
            reCreate()
        }
    }, [theMap])

    useEffect(() => {
        if (theMap) {
            tileOverlayRef.current?.setMap(theMap)
        }
        return () => {
            tileOverlayRef.current?.setMap(null)
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            tileOverlayRef.current?.setMap(null)
        }
    }, [])

    useEffect(() => {
        if (theMap) {
            reCreate()
        }
    }, [bounds, getUrl, override])
    useEffect(() => {
        tileOverlayRef.current?.setVisible(visible)
    }, [visible])
    useEffect(() => {
        tileOverlayRef.current?.setZIndex(zIndex)
    }, [zIndex])
    useEffect(() => {
        tileOverlayRef.current?.setOpacity(opacity)
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
