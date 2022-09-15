import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';

const MFDataLayer = (props) => {
    const {
        geoJsonString,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const dataLayerRef = useRef()


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
MFDataLayer.propTypes = {
    geoJsonString: PropTypes.string.isRequired,
    map: PropTypes.any,
    onCreated: PropTypes.func
};
export default MFDataLayer
