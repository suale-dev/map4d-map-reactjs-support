import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';

const MFBuildingOverlay = (props) => {
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
    const buildingOverlayRef = useRef()


    const reCreate = () => {
        buildingOverlayRef.current?.setMap(null)
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
        buildingOverlayRef.current = new map4d.BuildingOverlay(option)
        buildingOverlayRef.current?.setMap(theMap)
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
            buildingOverlayRef.current?.setMap(null)
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            buildingOverlayRef.current?.setMap(null)
        }
    }, [])

    useEffect(() => {
        if (theMap) {
            reCreate()
        }
    }, [getUrl,parserData, prefixId])
    return null
}
MFBuildingOverlay.propTypes = {
    getUrl: PropTypes.func.isRequired,
    visible: PropTypes.bool,
    parserData: PropTypes.func.isRequired,
    prefixId: PropTypes.string,
    map: PropTypes.any,
    onCreated: PropTypes.func
};
export default MFBuildingOverlay
