import React, { useEffect, useRef, useState } from 'react';
import { Map4dContext } from '../context';
import { MapEventEnum } from '../enum';

export function addLibrary(url: string, id: string) {
  let scriptId = `script_${id}`
  let exist = document.getElementById(scriptId)
  if (exist) {
    return null
  }
  const script = document.createElement('script')
  script.src = url;
  script.defer = true;
  script.id = scriptId
  document.body.appendChild(script)
  return script
}

const createId = () => {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
interface MapOptions {
  center?: any
  zoom?: number
  minZoom?: number
  maxZoom?: number
  maxNativeZoom?: number
  geolocate?: boolean
  tilt?: number
  bearing?: number
  controls?: boolean
  mapType?: any
  controlOptions?: any
  restrictionBounds?: any
  shouldChangeMapMode?: Function
  cooperativeGestures?: boolean
}
interface MapProps {
  mapid?: string
  options: MapOptions,
  version: string
  accessKey: string,
  environment?: "dev" | "test" | undefined | null,
  sdkDomain?: string | null
  onMapReady?: (map: any, key?: string) => void
  onClickLocation?: (args: any) => void
  onRightClickLocation?: (args: any) => void
  onCameraChanging?: (args: any) => void
  onTilesLoaded?: (args: any) => void
  children?: any
}

const MFMap = (props: MapProps) => {

  const callback = useRef(`callback`)
  const mapDomRef = useRef<any>()
  const mapRef = useRef<map4d.Map>()
  const scriptElement = useRef<HTMLScriptElement>()
  const url = useRef<string>()
  const events = useRef<any[]>([])

  const [map, setMap] = useState<map4d.Map>()


  useEffect(() => {
    const id = createId()
    callback.current = `callback_${id}`
    const createCallback = () => {
      window[callback.current] = () => {
        if (mapDomRef.current) {
          let options = props.options
          mapRef.current = new window.map4d.Map(mapDomRef.current, options)
          if (props.onMapReady) {
            props.onMapReady(mapRef.current, id)
          }
          registerEvent()
          setMap(mapRef.current)
        } else {
          console.error(`MFMap: map element is NOT found`)
        }
      }
    }
    let domain = `https://api${props.environment ? "-" + props.environment : ""}.map4d.vn`
    if (props.sdkDomain) {
      domain = props.sdkDomain
    }
    let urlNew = `${domain}/sdk/map/js?version=${props.version}&key=${props.accessKey}&callback=${callback.current}`
    if (props.mapid) {
      urlNew += `&mapId=${props.mapid}`
    }
    createCallback()
    let script = addLibrary(urlNew, id)
    if (script) {
      scriptElement.current = script
    }
    url.current = urlNew
    return () => {
      const destroy = () => {
        delete window[callback.current]
        if (scriptElement.current != null) {
          scriptElement.current.remove()
        }
        events.current?.forEach((t: any) => {
          t?.remove()
        })
        mapRef.current?.destroy()
        url.current = undefined
      }
      destroy()
    }
  }, [props.environment, props.version, props.accessKey])

  const registerEvent = () => {
    let eventClickMarker = mapRef.current?.addListener(MapEventEnum.click, (args: any) => {
      args.marker?.onClick && args.marker?.onClick(args)
    }, {
      marker: true
    })
    let eventRightClickMarker = mapRef.current?.addListener(MapEventEnum.rightClick, (args: any) => {
      args.marker?.onRightClick && args.marker?.onRightClick(args)
    }, {
      marker: true
    })
    let eventDragEndMarker = mapRef.current?.addListener(MapEventEnum.dragEnd, (args: any) => {
      args.marker?.onDragEnd && args.marker?.onDragEnd(args)
    }, {
      marker: true
    })

    let eventHoverMarker = mapRef.current?.addListener(MapEventEnum.hover, (args: any) => {
      args.marker?.onHover && args.marker?.onHover(args)
    }, {
      marker: true
    })

    let eventHoverPolygon = mapRef.current?.addListener(MapEventEnum.hover, (args: any) => {
      args.polygon?.onHover && args.polygon?.onHover(args)
    }, {
      polygon: true
    })

    let eventHoverPolyline = mapRef.current?.addListener(MapEventEnum.hover, (args: any) => {
      args.polyline?.onHover && args.polyline?.onHover(args)
    }, {
      polyline: true
    })

    let eventHoverDirection= mapRef.current?.addListener(MapEventEnum.hover, (args: any) => {
      args.renderer?.onHover && args.renderer?.onHover(args)
    }, {
      directions: true
    })

    let eventClickPolyline= mapRef.current?.addListener(MapEventEnum.click, (args: any) => {
      args.polyline?.onClick && args.polyline?.onClick(args)
    }, {
      polyline: true
    })

    let eventMouseOutDirection= mapRef.current?.addListener(MapEventEnum.mouseOut, (args: any) => {
      args.renderer?.onMouseOut && args.renderer?.onMouseOut(args)
    }, {
      directions: true
    })

    let eventMouseOverDirection= mapRef.current?.addListener(MapEventEnum.mouseOver, (args: any) => {
      args.renderer?.onMouseOver && args.renderer?.onMouseOver(args)
    }, {
      directions: true
    })

    let eventMouseMoveDirection= mapRef.current?.addListener(MapEventEnum.mouseMove, (args: any) => {
      args.renderer?.onMouseMove && args.renderer?.onMouseMove(args)
    }, {
      directions: true
    })

    let eventMouseOutPolyline= mapRef.current?.addListener(MapEventEnum.mouseOut, (args: any) => {
      args.polyline?.onMouseOut && args.polyline?.onMouseOut(args)
    }, {
      polyline: true
    })

    let eventMouseOverPolyline= mapRef.current?.addListener(MapEventEnum.mouseOver, (args: any) => {
      args.polyline?.onMouseOver && args.polyline?.onMouseOver(args)
    }, {
      polyline: true
    })

    let eventMouseMovePolyline= mapRef.current?.addListener(MapEventEnum.mouseMove, (args: any) => {
      args.polyline?.onMouseMove && args.polyline?.onMouseMove(args)
    }, {
      polyline: true
    })

    let eventMouseOutMarker= mapRef.current?.addListener(MapEventEnum.mouseOut, (args: any) => {
      args.marker?.onMouseOut && args.marker?.onMouseOut(args)
    }, {
      marker: true
    })

    let eventMouseOverMarker= mapRef.current?.addListener(MapEventEnum.mouseOver, (args: any) => {
      args.marker?.onMouseOver && args.marker?.onMouseOver(args)
    }, {
      marker: true
    })

    let eventMouseMoveMarker= mapRef.current?.addListener(MapEventEnum.mouseMove, (args: any) => {
      args.marker?.onMouseMove && args.marker?.onMouseMove(args)
    }, {
      marker: true
    })

    let eventClickPoi= mapRef.current?.addListener(MapEventEnum.click, (args: any) => {
      args.poi?.onClick && args.poi?.onClick(args)
    }, {
      poi: true
    })

    let eventHoverPoi= mapRef.current?.addListener(MapEventEnum.hover, (args: any) => {
      args.poi?.onHover && args.poi?.onHover(args)
    }, {
      poi: true
    })

    events.current = events.current.concat([
      eventClickMarker,
      eventRightClickMarker,
      eventDragEndMarker,
      eventHoverMarker,
      eventHoverPolygon,
      eventHoverPolyline,
      eventHoverDirection,
      eventClickPolyline,
      eventMouseOutDirection,
      eventMouseOverDirection,
      eventMouseMoveDirection,
      eventMouseOutPolyline,
      eventMouseOverPolyline,
      eventMouseMovePolyline,
      eventMouseOutMarker,
      eventMouseOverMarker,
      eventMouseMoveMarker,
      eventClickPoi,
      eventHoverPoi
    ])
    if (props.onClickLocation) {
      let onClickLocation = mapRef.current?.addListener(MapEventEnum.click, (args: any) => {
        props.onClickLocation && props.onClickLocation(args)
      }, {
        location: true
      })
      events.current.push(onClickLocation)
    }
    if (props.onRightClickLocation) {
      let onRightClickLocation = mapRef.current?.addListener(MapEventEnum.rightClick, (args: any) => {
        props.onRightClickLocation && props.onRightClickLocation(args)
      }, {
        location: true
      })
      events.current.push(onRightClickLocation)
    }
    if (props.onTilesLoaded) {
      let onTilesLoaded = mapRef.current?.addListener(MapEventEnum.tilesLoaded, (args: any) => {
        props.onTilesLoaded && props.onTilesLoaded(args)
      }, {
        location: true
      })
      events.current.push(onTilesLoaded)
    }
    if (props.onCameraChanging) {
      let onCameraChanging = mapRef.current?.addListener(MapEventEnum.cameraChanging, (args: any) => {
        props.onCameraChanging && props.onCameraChanging(args)
      }, {
        location: true
      })
      events.current.push(onCameraChanging)
    }
  }
  let newContext = {
    map: map
  }
  const refDiv = (r: any) => {
    mapDomRef.current = r
  }
  return (
    <Map4dContext.Provider value={newContext}>
      <div
        style={{ width: '100%', height: '100%', display: 'block' }}
        ref={refDiv}>
      </div>
      {
        props.children
      }
    </Map4dContext.Provider>
  );
}

export default MFMap;
