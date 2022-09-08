import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';

const MFDirectionsRenderer = (props) => {
    const {
        routes,
        activedIndex,
        activeStrokeWidth,
        activeStrokeColor,
        activeOutlineWidth,
        activeOutlineColor,
        activeStrokePattern,
        inactiveStrokeWidth,
        inactiveStrokeColor,
        inactiveOutlineWidth,
        inactiveOutlineColor,
        inactiveStrokePattern,
        originMarkerOptions,
        destinationMarkerOptions,
        waypointMarkerOptions,
        onMarkerDragEnd,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const directionRef = useRef()

    useEffect(() => {
        if (theMap && !directionRef.current) {
            let option = {
                routes,
                activedIndex,
                activeStrokeWidth,
                activeStrokeColor,
                activeOutlineWidth,
                activeOutlineColor,
                activeStrokePattern,
                inactiveStrokeWidth,
                inactiveStrokeColor,
                inactiveOutlineWidth,
                inactiveOutlineColor,
                inactiveStrokePattern,
                originMarkerOptions,
                destinationMarkerOptions,
                waypointMarkerOptions,
                onMarkerDragEnd
            }
            Object.keys(option).forEach(key => {
                if (option[key] == undefined || option[key] == null) {
                    delete option[key]
                }
            })
            console.log(option)
            directionRef.current = new map4d.DirectionsRenderer(option)
            directionRef.current?.setMap(theMap)
            onCreated && onCreated(directionRef.current)
        }
    }, [theMap])

    useEffect(() => {
        if (theMap) {
            directionRef.current?.setMap(theMap)
        }
        return () => {
            directionRef.current?.setMap(null)
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            directionRef.current?.setMap(null)
        }
    }, [])

    useEffect(() => {
        directionRef.current?.setRoutes(routes)
    }, [routes])
    useEffect(() => {
        directionRef.current?.setActivedIndex(activedIndex)
    }, [activedIndex])
    useEffect(() => {
        directionRef.current?.setActiveStrokePattern(activeStrokePattern)
    }, [activeStrokePattern])
    useEffect(() => {
        directionRef.current?.setInactiveStrokePattern(inactiveStrokePattern)
    }, [inactiveStrokePattern])
    useEffect(() => {
        let option = {
            routes,
            activedIndex,
            activeStrokeWidth,
            activeStrokeColor,
            activeOutlineWidth,
            activeOutlineColor,
            activeStrokePattern,
            inactiveStrokeWidth,
            inactiveStrokeColor,
            inactiveOutlineWidth,
            inactiveOutlineColor,
            inactiveStrokePattern,
            originMarkerOptions,
            destinationMarkerOptions,
            waypointMarkerOptions,
            onMarkerDragEnd
        }
        Object.keys(option).forEach(key => {
            if (option[key] == undefined || option[key] == null) {
                delete option[key]
            }
        })
        directionRef.current?.setOptions(option)
    },
        [
            activeStrokeWidth,
            activeStrokeColor,
            activeOutlineWidth,
            activeOutlineColor,
            inactiveStrokeColor,
            inactiveOutlineWidth,
            inactiveOutlineColor,
            originMarkerOptions,
            destinationMarkerOptions,
            waypointMarkerOptions,
            onMarkerDragEnd
        ]
    )


    return null
}
MFDirectionsRenderer.propTypes = {
    routes: PropTypes.any,
    activedIndex: PropTypes.number,
    activeStrokeWidth: PropTypes.number,
    activeStrokeColor: PropTypes.string,
    activeOutlineWidth: PropTypes.number,
    activeOutlineColor: PropTypes.string,
    activeStrokePattern: PropTypes.any,
    inactiveStrokeWidth: PropTypes.number,
    inactiveStrokeColor: PropTypes.string,
    inactiveOutlineWidth: PropTypes.number,
    inactiveOutlineColor: PropTypes.string,
    inactiveStrokePattern: PropTypes.any,
    originMarkerOptions: PropTypes.any,
    destinationMarkerOptions: PropTypes.any,
    waypointMarkerOptions: PropTypes.any,
    onMarkerDragEnd: PropTypes.func,
    map: PropTypes.any,
    onCreated: PropTypes.func
};
export default MFDirectionsRenderer
