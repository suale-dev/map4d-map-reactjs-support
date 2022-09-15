import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';

interface ImageOverlayProps extends map4d.ImageOverlayOptions {
    map?: map4d.Map,
    onCreated?: (imageOverlay: map4d.ImageOverlay) => void
}

const MFImageOverlay = (props: ImageOverlayProps) => {
    const {
        url,
        bounds,
        visible,
        zIndex,
        opacity,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const imageOverlayRef = useRef<map4d.ImageOverlay>()


    const reCreate = () => {
        imageOverlayRef.current?.setMap(null as unknown as map4d.Map)
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
        imageOverlayRef.current?.setMap(theMap as map4d.Map)
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
            imageOverlayRef.current?.setMap(null as unknown as map4d.Map)
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            imageOverlayRef.current?.setMap(null as unknown as map4d.Map)
        }
    }, [])

    useEffect(() => {
        if (theMap) {
            reCreate()
        }
    }, [url, bounds, zIndex])
    useEffect(() => {
        visible != undefined && imageOverlayRef.current?.setVisible(visible)
    }, [visible])
    useEffect(() => {
        opacity != undefined && imageOverlayRef.current?.setOpacity(opacity)
    }, [opacity])
    return null
}
export default MFImageOverlay
