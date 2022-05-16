import React from 'react';

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

class Map4dMap extends React.Component {  
  constructor(props) {
    super(props)
    if (Map4dMap.mapKeys == null) {
      Map4dMap.mapKeys = new Map()
    }
    this.mapKey = props.id || "default"
    if (!Map4dMap.mapKeys.has(this.mapKey)) {
      Map4dMap.mapKeys.set(this.mapKey, this.mapKey)
    } else {
      console.error(`Map4dMap: The 'id' prop is NOT found or DUPLICATE, the map initialization might work incorrectly`)
    }         
    this.callback = `callback_${this.mapKey}`    
    window[this.callback] = () => {
      if (this.mapDomRef) {        
        let options = props.options
        this.map = new map4d.Map(this.mapDomRef, options)
        if (props.onMapReady) {
          props.onMapReady(this.map)
        }
      } else {
        console.error(`Map4dMap: map element is NOT found`)
      }
    }
    this.setMapDomRef = this.setMapDomRef.bind(this)
  }

  setMapDomRef(e) {    
    this.mapDomRef = e
  }

  componentWillUnmount() {    
    Map4dMap.mapKeys.delete(this.mapKey)
    if (this.mapScript != null) {
      this.mapScript.remove()
    }
    this.map && this.map.destroy()
  }

  render() {
    let callback = this.callback
    let url = `https://api.map4d.vn/sdk/map/js?version=${this.props.version}&key=${this.props.accessKey}&callback=${callback}`    
    if (this.props.mapid) {
      url += `&mapId=${this.props.mapid}`
    }
    if (url != this.url) {
      if (this.mapScript != null) {
        this.mapScript.remove()
      }
      let script = addLibrary(url, this.mapKey)
      if (script) {
        this.mapScript = script
      }
    }    
    this.url = url    
    return (
      <div 
      style={{width: '100%', height: '100%'}} 
      id={`${this.mapKey}`} 
      ref={this.setMapDomRef}>
      </div>
    );
  }
}

export default Map4dMap;
