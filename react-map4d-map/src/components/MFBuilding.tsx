import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';

interface BuildingProps {
    position?: map4d.ILatLng
    name?: string
    scale?: number
    bearing?: number
    elevation?: number
    height?: number
    model?: string
    texture?: string
    coordinates?: map4d.ILatLng[]
    zIndex?: number
    visible?: boolean
    draggable?: boolean
    userInteractionEnabled?: boolean
    selected?: boolean
    growUp?: boolean
    map?: map4d.Map
    onCreated?: (building: map4d.Building) => void
}
const MFBuilding = (props: BuildingProps) => {
    const {
        position,
        name,
        scale,
        bearing,
        elevation,
        height,
        model,
        texture,
        coordinates,
        visible,
        draggable,
        userInteractionEnabled,
        selected,
        growUp,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const buildingRef = useRef(null as unknown as map4d.Building)

    useEffect(() => {
        if (theMap && !buildingRef.current && (coordinates && coordinates?.length > 0 || model)) {
            let option = {
                position: position || { lat: 10.793113, lng: 106.720739 },
                name: name,
                scale: scale,
                bearing: bearing,
                elevation: elevation,
                height: height,
                model: model,
                texture: texture,
                coordinates: coordinates,
                visible: visible,
                draggable: draggable,
                userInteractionEnabled: userInteractionEnabled,
                selected: selected,
                growUp: growUp
            }
            Object.keys(option).forEach(key => {
                if (option[key] == undefined || option[key] == null) {
                    delete option[key]
                }
            })
            buildingRef.current = new map4d.Building(option)
            buildingRef.current?.setMap(theMap)
            onCreated && onCreated(buildingRef.current)
        }
    }, [theMap, position, coordinates, model])

    useEffect(() => {
        if (theMap) {
            buildingRef.current?.setMap(theMap)
        }
        return () => {
            buildingRef.current?.setMap(null as unknown as map4d.Map)
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            buildingRef.current?.setMap(null as unknown as map4d.Map)
        }
    }, [])

    useEffect(() => {
        buildingRef.current?.setPosition(position as map4d.ILatLng)
    }, [position])
    useEffect(() => {
        name != undefined && buildingRef.current?.setName(name)
    }, [name])
    useEffect(() => {
        scale != undefined && buildingRef.current?.setScale(scale)
    }, [scale])
    useEffect(() => {
        if (bearing != undefined) {
            buildingRef.current?.setBearing(bearing)
        }
    }, [bearing])
    useEffect(() => {
        elevation != undefined && buildingRef.current?.setElevation(elevation)
    }, [elevation])
    useEffect(() => {
        height != undefined && buildingRef.current?.setHeight(height)
    }, [height])
    useEffect(() => {
        model != undefined && buildingRef.current?.setModel(model)
    }, [model])
    useEffect(() => {
        texture != undefined && buildingRef.current?.setTexture(texture)
    }, [texture])
    useEffect(() => {
        coordinates != undefined && buildingRef.current?.setCoordinates(coordinates)
    }, [coordinates])
    useEffect(() => {
        visible != undefined && buildingRef.current?.setVisible(visible)
    }, [visible])
    useEffect(() => {
        draggable != undefined && buildingRef.current?.setDraggable(draggable)
    }, [draggable])
    useEffect(() => {
        userInteractionEnabled != undefined && buildingRef.current?.setUserInteraction(userInteractionEnabled)
    }, [userInteractionEnabled])
    useEffect(() => {
        selected != undefined && buildingRef.current?.setSelected(selected)
    }, [selected])
    useEffect(() => {
        growUp != undefined && buildingRef.current?.setGrowUp(growUp)
    }, [growUp])
    return null
}
export default MFBuilding
