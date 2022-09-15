# react-map4d-map

> react-map4d-map

[![NPM](https://img.shields.io/npm/v/react-map4d-map.svg)](https://www.npmjs.com/package/react-map4d-map) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-map4d-map
```

## Usage

```tsx
import React, { useState } from "react"
import { MFBuilding, MFMap } from "react-map4d-map"

const Example = (props) => {
  const [post, setPost] = useState({ lat: 16.103254, lng: 108.214835 })
    return (
      <div style={{ width: '80%', height: '500px' }}>
          <MFMap
            onMapReady={onMapReady1}
            options={{
              center: { lat: 16.103254, lng: 108.214835 },
                zoom: 18,
                tilt: 50,
                bearing: 250,
                controls: true
              }}
              accessKey={"yourKey"}
              version={"2.3"} >
                <MFBuilding
                  name="test"
                  model={"https://sw-hcm-1.vinadata.vn/v1/AUTH_d0ecabcbdcd74f6aa6ac9a5da528eb78/sdk/models/5d26e774bb542caaf439e605.obj"}
                  text={"https://sw-hcm-1.vinadata.vn/v1/AUTH_d0ecabcbdcd74f6aa6ac9a5da528eb78/sdk/textures/5d26e775bb542caaf439e607.png"}
                  position={post}
                />
          </MFMap>
      </div>
    )
  }
}
```

## License

MIT © [vantoan2509](https://github.com/vantoan2509)
