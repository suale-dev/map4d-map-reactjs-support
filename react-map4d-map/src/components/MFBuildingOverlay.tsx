import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';

interface BuildingOverlayProps {
    getUrl: (x: number, y: number, zoom: number) => any
    parserData: (response: any) => any
    prefixId?: string
    visible?: boolean
    map?: map4d.Map
    onCreated?: (buildingOverlay: map4d.BuildingOverlay) => void
}
const MFBuildingOverlay = (props: BuildingOverlayProps) => {
    const {
        getUrl,
        visible,
        parserData,
        prefixId,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const buildingOverlayRef = useRef<map4d.BuildingOverlay>()


    const reCreate = () => {
        buildingOverlayRef.current?.setMap(null as unknown as map4d.Map)
        let option = {
            getUrl: getUrl || { lat: 10.793113, lng: 106.720739 },
            visible: visible,
            parserData: parserData,
            prefixId: prefixId
        } as any
        Object.keys(option).forEach(key => {
            if (option[key] == undefined || option[key] == null) {
                delete option[key]
            }
        })
        buildingOverlayRef.current = new map4d.BuildingOverlay(option)
        buildingOverlayRef.current?.setMap(theMap as map4d.Map)
        onCreated && onCreated(buildingOverlayRef.current)
    }

    useEffect(() => {
        if (theMap && !buildingOverlayRef.current) {
            reCreate()
        }
    }, [theMap])

    useEffect(() => {
        if (theMap) {
            buildingOverlayRef.current?.setMap(theMap)
        }
        return () => {
            buildingOverlayRef.current?.setMap(null as unknown as map4d.Map)
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            buildingOverlayRef.current?.setMap(null as unknown as map4d.Map)
        }
    }, [])

    useEffect(() => {
        if (theMap) {
            reCreate()
        }
    }, [getUrl, parserData, prefixId, visible])
    return null
}
export default MFBuildingOverlay
