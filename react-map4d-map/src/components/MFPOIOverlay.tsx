import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';

interface POIOverlayProps extends map4d.POIOverlayOptions {
    map?: map4d.Map,
    onCreated?: (poiOverlay: map4d.POIOverlay) => void
}

const MFPOIOverlay = (props: POIOverlayProps) => {
    const {
        getUrl,
        visible = true,
        parserData,
        prefixId,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const poiOverlayRef = useRef<map4d.POIOverlay>()


    const reCreate = () => {
        poiOverlayRef.current?.setMap(null)
        let option = {
            getUrl: getUrl || { lat: 10.793113, lng: 106.720739 },
            visible: visible,
            parserData: parserData,
            prefixId: prefixId
        }
        Object.keys(option).forEach(key => {
            if (option[key] == undefined || option[key] == null) {
                delete option[key]
            }
        })
        poiOverlayRef.current = new map4d.POIOverlay(option)
        poiOverlayRef.current?.setMap(theMap)
        onCreated && onCreated(poiOverlayRef.current)
    }

    useEffect(() => {
        if (theMap && !poiOverlayRef.current) {
            reCreate()
        }
    }, [theMap])

    useEffect(() => {
        if (theMap) {
            poiOverlayRef.current?.setMap(theMap)
        }
        return () => {
            poiOverlayRef.current?.setMap(null)
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            poiOverlayRef.current?.setMap(null)
        }
    }, [])

    useEffect(() => {
        if (theMap) {
            reCreate()
        }
    }, [getUrl, parserData, prefixId])
    return null
}
export default MFPOIOverlay
