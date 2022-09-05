import React from 'react';
import { Map4dContext } from '../context';
import PropTypes from 'prop-types';

export function addLibrary(url, id) {
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

class Map4dMap extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      map: null
    }
    this.mapKey = createId()
    this.callback = `callback_${this.mapKey}`
    this.setMapDomRef = this.setMapDomRef.bind(this)
  }

  setMapDomRef(e) {
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
    this.mapRef && this.mapRef.destroy()
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
        console.error(`Map4dMap: map element is NOT found`)
      }
    }
  }

  render() {
    let url = `https://api.map4d.vn/sdk/map/js?version=${this.props.version}&key=${this.props.accessKey}&callback=${this.callback}`
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
Map4dMap.contextType = Map4dContext
Map4dMap.propTypes = {
  options: PropTypes.shape({
    center: PropTypes.any,
    zoom: PropTypes.number,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    maxNativeZoom: PropTypes.number,
    geolocate: PropTypes.bool,
    accessKey: PropTypes.string,
    tilt: PropTypes.number,
    bearing: PropTypes.number,
    controls: PropTypes.bool,
    controlOptions: PropTypes.any,
    restrictionBounds: PropTypes.any,
    mapType: PropTypes.any,
    cooperativeGestures: PropTypes.bool
  }).isRequired,
  version: PropTypes.string.isRequired,
  accessKey: PropTypes.string.isRequired,
  onMapReady: PropTypes.func,
};

export default Map4dMap;
