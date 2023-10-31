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
    clickable?: boolean
    selected?: boolean
    growUp?: boolean
    map?: map4d.Map
    onCreated?: (building: map4d.Building) => void
}
const MFBuilding = (props: BuildingProps) => {
    const {
        position,
        name,
        scale = 1,
        bearing = 0,
        elevation = 0,
        height = 1,
        model,
        texture,
        coordinates,
        visible = true,
        draggable = false,
        clickable = true,
        selected = false,
        growUp = true,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const buildingRef = useRef(null as unknown as map4d.Building)

    useEffect(() => {
        if (theMap && !buildingRef.current && ((coordinates && coordinates?.length > 0) || model)) {
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
                clickable: clickable,
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
        buildingRef.current?.setName(name)
    }, [name])
    useEffect(() => {
        buildingRef.current?.setScale(scale)
    }, [scale])
    useEffect(() => {
        buildingRef.current?.setBearing(bearing)
    }, [bearing])
    useEffect(() => {
        buildingRef.current?.setElevation(elevation)
    }, [elevation])
    useEffect(() => {
        buildingRef.current?.setHeight(height)
    }, [height])
    useEffect(() => {
        buildingRef.current?.setModel(model)
    }, [model])
    useEffect(() => {
        buildingRef.current?.setTexture(texture)
    }, [texture])
    useEffect(() => {
        buildingRef.current?.setCoordinates(coordinates)
    }, [coordinates])
    useEffect(() => {
        buildingRef.current?.setVisible(visible)
    }, [visible])
    useEffect(() => {
       buildingRef.current?.setDraggable(draggable)
    }, [draggable])
    useEffect(() => {
        buildingRef.current?.setClickable(clickable)
    }, [clickable])
    useEffect(() => {
        buildingRef.current?.setSelected(selected)
    }, [selected])
    useEffect(() => {
        buildingRef.current?.setGrowUp(growUp)
    }, [growUp])
    return null
}
export default MFBuilding
