import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';

interface DirectionsRendererProps {
    routes?: string | object | map4d.RouteOptions | map4d.ILatLng[][]

    /**
     * @deprecated The `directions` prop is no longer support, which is subject to removal in a future versions. Use
     * the `routes` prop instead.
     */
    directions?: string
    activedIndex?: number

    activeStrokeWidth?: number
    activeStrokeColor?: string
    activeOutlineWidth?: number
    activeOutlineColor?: string
    activeStrokePattern?: map4d.PatternItem

    inactiveStrokeWidth?: number
    inactiveStrokeColor?: string
    inactiveOutlineWidth?: number
    inactiveOutlineColor?: string
    inactiveStrokePattern?: map4d.PatternItem

    originMarkerOptions?: map4d.MarkerOptions
    destinationMarkerOptions?: map4d.MarkerOptions
    waypointMarkerOptions?: map4d.MarkerOptions[]

    onMarkerDragEnd?: Function,

    map?: map4d.Map,
    onCreated?: (directionsRenderer?: map4d.DirectionsRenderer) => void
    onHover?: (directions: any) => void
    onMouseOut?:(marker: any)=> void
    onMouseOver?:(marker: any)=> void
    onMouseMove?: (marker: any)=> void
}

const MFDirectionsRenderer = (props: DirectionsRendererProps) => {
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
        onHover,
        onCreated,   
        onMouseOut,
        onMouseOver,
        onMouseMove
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const directionRef = useRef<any>()

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
            directionRef.current = new map4d.DirectionsRenderer(option)
            directionRef.current?.setMap(theMap)
            directionRef.current.onHover = props.onHover
            directionRef.current.onMouseOut = onMouseOut
            directionRef.current.onMouseOver = onMouseOver
            directionRef.current.onMouseMove = onMouseMove
            onCreated && onCreated(directionRef.current)
        }
    }, [theMap])

    useEffect(() => {
        if (directionRef.current) {
            directionRef.current.onHover = onHover
        }
    }, [onHover])

    useEffect(() => {
        if (directionRef.current) {
            directionRef.current.onMouseOut = onMouseOut
        }
    }, [onMouseOut])

    useEffect(() => {
        if (directionRef.current) {
            directionRef.current.onMouseOver = onMouseOver
        }
    }, [onMouseOver])

    useEffect(() => {
        if (directionRef.current) {
            directionRef.current.onMouseMove = onMouseMove
        }
    }, [onMouseMove])

    useEffect(() => {
        if (theMap) {
            directionRef.current?.setMap(theMap)
        }
        return () => {
            directionRef.current?.setMap(null as unknown as map4d.Map)
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            directionRef.current?.setMap(null as unknown as map4d.Map)
        }
    }, [])

    useEffect(() => {
        routes != undefined && directionRef.current?.setRoutes(routes)
    }, [routes])
    useEffect(() => {
        activedIndex != undefined && directionRef.current?.setActivedIndex(activedIndex)
    }, [activedIndex])
    useEffect(() => {
        activeStrokePattern != undefined && directionRef.current?.setActiveStrokePattern(activeStrokePattern)
    }, [activeStrokePattern])
    useEffect(() => {
        inactiveStrokePattern != undefined && directionRef.current?.setInactiveStrokePattern(inactiveStrokePattern)
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
export default MFDirectionsRenderer
