import React from 'react';

export function addLibrary(url, id) {
  const script = document.createElement('script')
  script.src = url;
  script.defer = true;
  script.id = id
  document.body.appendChild(script)
  return script
}

class Map4dMap extends React.Component {  
  constructor(props) {
    super(props)
    if (Map4dMap.mapKeys == null) {
      Map4dMap.mapKeys = {}
    }
    this.mapKey = props.id || "default"
    if (!Map4dMap.mapKeys[this.mapKey]) {
      Map4dMap.mapKeys[this.mapKey] = this.mapKey
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
  }

  componentWillUnmount() {
    Map4dMap.mapKeys.delete(this.mapKey)
    if (this.mapScript != null && this.mapScript.remove) {
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
    if (this.mapScript != null && this.mapScript.remove) {
      this.mapScript.remove()
    }
    this.mapScript = addLibrary(url, this.mapKey)
    return (
      <div 
      style={{width: '100%', height: '100%'}} 
      id={`${this.mapKey}`} 
      ref={(e) => this.mapDomRef = e}>
      </div>
    );
  }
}

export default Map4dMap;
