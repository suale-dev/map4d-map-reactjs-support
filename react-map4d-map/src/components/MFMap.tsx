import React from 'react';
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
  onMapReady: (map: any, key?: string) => void
  onClickLocation?: (args: any) => void
  onRightClickLocation?: (args: any) => void
  onCameraChanging?: (args: any) => void
  onTilesLoaded?: (args: any) => void
}

class MFMap extends React.Component<MapProps, any> {

  mapKey: string;
  callback: string;
  mapDomRef: any;
  mapRef: map4d.Map;
  scriptElement: any;
  url: string | null;
  events = [] as any[]
  constructor(props: MapProps) {
    super(props)
    this.state = {
      map: null
    }
    this.mapKey = createId()
    this.callback = `callback_${this.mapKey}`
    this.setMapDomRef = this.setMapDomRef.bind(this)
  }

  setMapDomRef(e: any) {
    this.mapDomRef = e
  }

  componentWillUnmount() {
    this.destroy()
  }

  destroy() {
    delete window[this.callback]
    if (this.scriptElement != null) {
      this.scriptElement.remove()
    }
    this.events?.forEach((t: any) => {
      t?.remove()
    })
    this.mapRef?.destroy && this.mapRef.destroy()
    this.url = null
  }

  registerEvent() {

    let eventClickMarker = this.mapRef?.addListener(MapEventEnum.click, (args: any) => {
      args.marker?.onClick && args.marker?.onClick()
    }, {
      marker: true
    })
    let eventRightClickMarker = this.mapRef?.addListener(MapEventEnum.rightClick, (args: any) => {
      args.marker?.onRightClick && args.marker?.onRightClick()
    }, {
      marker: true
    })
    let eventDragEndMarker = this.mapRef?.addListener(MapEventEnum.dragEnd, (args: any) => {
      args.marker?.onDragEnd && args.marker?.onDragEnd()
    }, {
      marker: true
    })
    this.events = this.events.concat([eventClickMarker, eventRightClickMarker, eventDragEndMarker])
    if (this.props.onClickLocation) {
      let onClickLocation = this.mapRef?.addListener(MapEventEnum.click, (args: any) => {
        this.props.onClickLocation && this.props.onClickLocation(args)
      }, {
        location: true
      })
      this.events.push(onClickLocation)
    }
    if (this.props.onRightClickLocation) {
      let onRightClickLocation = this.mapRef?.addListener(MapEventEnum.rightClick, (args: any) => {
        this.props.onRightClickLocation && this.props.onRightClickLocation(args)
      }, {
        location: true
      })
      this.events.push(onRightClickLocation)
    }
    if (this.props.onTilesLoaded) {
      let onTilesLoaded = this.mapRef?.addListener(MapEventEnum.tilesLoaded, (args: any) => {
        this.props.onTilesLoaded && this.props.onTilesLoaded(args)
      }, {
        location: true
      })
      this.events.push(onTilesLoaded)
    }
    if (this.props.onCameraChanging) {
      let onCameraChanging = this.mapRef?.addListener(MapEventEnum.cameraChanging, (args: any) => {
        this.props.onCameraChanging && this.props.onCameraChanging(args)
      }, {
        location: true
      })
      this.events.push(onCameraChanging)
    }
  }

  createCallback() {
    window[this.callback] = () => {
      if (this.mapDomRef) {
        let options = this.props.options
        this.mapRef = new window.map4d.Map(this.mapDomRef, options)
        if (this.props.onMapReady) {
          this.props.onMapReady(this.mapRef, this.mapKey)
        }
        this.registerEvent()

        this.setState({
          map: this.mapRef
        })
      } else {
        console.error(`MFMap: map element is NOT found`)
      }
    }
  }

  render() {
    let url = `https://api${this.props.environment ? "-" + this.props.environment : ""}.map4d.vn/sdk/map/js?version=${this.props.version}&key=${this.props.accessKey}&callback=${this.callback}`
    if (this.props.mapid) {
      url += `&mapId=${this.props.mapid}`
    }
    if (url != this.url) {
      this.destroy()
      this.createCallback()
      let script = addLibrary(url, this.mapKey)
      if (script) {
        this.scriptElement = script
      }
    }
    this.url = url
    let newContext = {
      map: this.state.map
    }
    return (
      <Map4dContext.Provider value={newContext}>
        <div
          style={{ width: '100%', height: '100%', display: 'block' }}
          id={`${this.mapKey}`}
          ref={this.setMapDomRef}>
        </div>
        {
          this.props.children
        }
      </Map4dContext.Provider>
    );
  }
}
MFMap.contextType = Map4dContext

export default MFMap;
