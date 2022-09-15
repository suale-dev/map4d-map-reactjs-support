import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';

interface DataLayerProps {
    geoJsonString: string
    map?: map4d.Map
    onCreated?: (dataLeyer?: map4d.Data.Feature[]) => void
}

const MFDataLayer = (props: DataLayerProps) => {
    const {
        geoJsonString,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const dataLayerRef = useRef<map4d.Data.Feature[]>()


    const reCreate = () => {
        dataLayerRef.current?.forEach((feature) => {
            theMap?.data?.remove(feature)
        })
        dataLayerRef.current = theMap?.data?.addGeoJson(geoJsonString)
        onCreated && onCreated(dataLayerRef.current)
    }

    useEffect(() => {
        if (theMap) {
            reCreate()
        }
    }, [theMap])

    useEffect(() => {
        return () => {
            dataLayerRef.current?.forEach((feature) => {
                theMap?.data?.remove(feature)
            })
        }
    }, [])
    return null
}
export default MFDataLayer
