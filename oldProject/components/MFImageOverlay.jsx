import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';

const MFImageOverlay = (props) => {
    const {
        url,
        bounds,
        visible = true,
        zIndex,
        opacity,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const imageOverlayRef = useRef()


    const reCreate = () => {
        imageOverlayRef.current?.setMap(null)
        let option = {
            url,
            bounds: bounds,
            visible: visible,
            zIndex: zIndex,
            opacity: opacity
        }
        Object.keys(option).forEach(key => {
            if (option[key] == undefined || option[key] == null) {
                delete option[key]
            }
        })
        imageOverlayRef.current = new map4d.ImageOverlay(option)
        imageOverlayRef.current?.setMap(theMap)
        onCreated && onCreated(imageOverlayRef.current)
    }

    useEffect(() => {
        if (theMap && !imageOverlayRef.current) {
            reCreate()
        }
    }, [theMap])

    useEffect(() => {
        if (theMap) {
            imageOverlayRef.current?.setMap(theMap)
        }
        return () => {
            imageOverlayRef.current?.setMap(null)
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            imageOverlayRef.current?.setMap(null)
        }
    }, [])

    useEffect(() => {
        if (theMap) {
            reCreate()
        }
    }, [url, bounds, zIndex])
    useEffect(() => {
        imageOverlayRef.current?.setVisible(visible)
    }, [visible])
    useEffect(() => {
        imageOverlayRef.current?.setOpacity(opacity)
    }, [opacity])
    return null
}
MFImageOverlay.propTypes = {
    url: PropTypes.any.isRequired,
    bounds: PropTypes.func.isRequired,
    visible: PropTypes.bool,
    zIndex: PropTypes.number,
    opacity: PropTypes.number,
    map: PropTypes.any,
    onCreated: PropTypes.func
};
export default MFImageOverlay
