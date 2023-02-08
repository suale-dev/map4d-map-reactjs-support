import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';

interface TileOverlayProps {
    getUrl: Function
    visible?: boolean
    zIndex?: number
    opacity?: number
    map?: map4d.Map,
    onCreated?: (tileOverlay: map4d.TileOverlay) => void
}

const MFTileOverlay = (props: TileOverlayProps) => {
    const {
        getUrl,
        visible = true,
        zIndex,
        opacity,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const tileOverlayRef = useRef<map4d.TileOverlay>()


    const reCreate = () => {
        tileOverlayRef.current?.setMap(null)
        let option = {
            getUrl: getUrl || { lat: 10.793113, lng: 106.720739 },
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
    }, [getUrl])
    useEffect(() => {
        tileOverlayRef.current?.setVisible(visible)
    }, [visible])
    useEffect(() => {
        zIndex != undefined && tileOverlayRef.current?.setZIndex(zIndex)
    }, [zIndex])
    useEffect(() => {
        opacity != undefined && tileOverlayRef.current?.setOpacity(opacity)
    }, [opacity])
    return null
}
export default MFTileOverlay
