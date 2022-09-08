import { createContext } from 'react';

export const markerClusterDefaultContext = {
    addMarker: null,
    removeMarker: null
}
export const MarkerClusterContext = createContext(markerClusterDefaultContext)