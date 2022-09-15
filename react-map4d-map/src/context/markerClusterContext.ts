import { createContext } from 'react';

export const markerClusterDefaultContext = {
    addMarker: null as unknown as (marker: map4d.Marker)=>void,
    removeMarker: null as unknown as (marker: map4d.Marker)=>void,
}
export const MarkerClusterContext = createContext(markerClusterDefaultContext)