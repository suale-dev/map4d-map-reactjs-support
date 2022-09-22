import React from 'react';
import { Map4dContext } from '../context';

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

interface MapProps {
  mapid?: string
  options: map4d.MapOptions,
  version: string
  accessKey: string,
  environment?: "dev" | "test" | undefined | null,
  onMapReady: (map: map4d.Map, key?: string) => void
}

class MFMap extends React.Component<MapProps, any> {

  mapKey: string;
  callback: string;
  mapDomRef: any;
  mapRef: map4d.Map;
  scriptElement: any;
  url: string | null;
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
    this.mapRef?.destroy && this.mapRef.destroy()
    this.url = null
  }

  createCallback() {
    window[this.callback] = () => {
      if (this.mapDomRef) {
        let options = this.props.options
        this.mapRef = new window.map4d.Map(this.mapDomRef, options)
        if (this.props.onMapReady) {
          this.props.onMapReady(this.mapRef, this.mapKey)
        }
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
    let newContext = { ...this.context }
    newContext.map = this.state.map
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
