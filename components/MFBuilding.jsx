import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import { Map4dContext } from '../context';

const MFBuilding = (props) => {
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
        visible = true,
        draggable,
        userInteractionEnabled,
        selected,
        growUp = true,
        map,
        onCreated
    } = props

    const map4dContext = useContext(Map4dContext);
    const theMap = map || map4dContext.map
    const buildingRef = useRef()

    useEffect(() => {
        if (theMap && !buildingRef.current) {
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
    }, [theMap])

    useEffect(() => {
        if (theMap) {
            buildingRef.current?.setMap(theMap)
        }
        return () => {
            buildingRef.current?.setMap(null)
        }
    }, [theMap])
    useEffect(() => {
        return () => {
            buildingRef.current?.setMap(null)
        }
    }, [])

    useEffect(() => {
        buildingRef.current?.setPosition(position)
    }, [position])
    useEffect(() => {
        buildingRef.current?.setName(name)
    }, [name])
    useEffect(() => {
        buildingRef.current?.getScale(scale)
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
        buildingRef.current?.setUserInteraction(userInteractionEnabled)
    }, [userInteractionEnabled])
    useEffect(() => {
        buildingRef.current?.setSelected(selected)
    }, [selected])
    useEffect(() => {
        buildingRef.current?.setGrowUp(growUp)
    }, [growUp])
    return null
}
MFBuilding.propTypes = {
    position: PropTypes.any.isRequired,
    name: PropTypes.string,
    scale: PropTypes.number,
    bearing: PropTypes.number,
    elevation: PropTypes.number,
    height: PropTypes.number,
    model: PropTypes.string,
    texture: PropTypes.string,
    coordinates: PropTypes.array,
    visible: PropTypes.bool,
    draggable: PropTypes.bool,
    userInteractionEnabled: PropTypes.bool,
    selected: PropTypes.bool,
    growUp: PropTypes.bool,
    map: PropTypes.any,
    onCreated: PropTypes.func
};
export default MFBuilding
