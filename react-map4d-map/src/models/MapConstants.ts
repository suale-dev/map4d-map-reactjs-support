import { Matrix4 } from "../engine/Matrix"
import { Color } from "../engine/Color"

export class MapConstants {

  static none = -1.0

  static baseTileSize = 256

  static minLatitude = -85.051128779806604

  static maxLatitude = 85.051128779806604

  static maxLongitude = 180

  static minLongitude = -180

  static maxDegrees = 360

  static radiusEarthMeters = 6378137.0

  static halfEarthCircumFerenceInMeter = MapConstants.radiusEarthMeters * Math.PI

  static earthCircumFerenceInMeter = MapConstants.halfEarthCircumFerenceInMeter * 2

  static tileCacheSize = 512

  static baseMapLowestOrder = Number.MIN_SAFE_INTEGER

  static baseMapMiddleOrder = -1.0E6

  static buildingLayerOrder = 0

  static userPOILayerOrder = 1.0

  static pointGeoJsonWidth = 32

  static pointGeoJsonHeight = 32

  static placeSelectedIdPrefix = "maplink-selected-place-"

  static placeWidth = 26

  static placeHeight = 32

  static spritePadding = 2.

  static get placeFontSize() {
    return 12
  }

  static poiFontWeight = "normal"

  static poiMaxWidth = 120

  static poiNumLine = 2

  static poiDefaultColor = new Color(0.5, 0.6, 0.7)

  static pointGeoJsonAnchor = [0.5, 1.0]

  static infoWindowPadding = 2

  // pixels/s
  static flingMinVelocity = -10000.0

  // pixels/s
  static flingMaxVelocity = 10000.0

  static flingTimeConstant = 150.0

  static flingSpeedMultiply = 15

  static zoomSpeedMouseWheel = 15

  // milliseconds
  static minDurationFlyTo = 1000

  // milliseconds
  static maxDurationFlyTo = 13000

  static maxBearingAngle = 720

  static defaultMinZoom = 3

  static defaultMinZoom3d = 17

  static defaultMaxZoom = 22

  static defaultMaxNativeZoom = 19

  static geoJsonMinNativeZoom = 20

  static vectorBuildingsMinZoom = 17

  static tileExtend = 4096.0

  static defaultAnimationDuration = 300

  static defaultFlyZoom = 17.0

  static minTilt = 0.0

  static maxTilt2D = 40.0

  static maxTilt3D = 87.0

  static get maxTiltIntersectWithScreen() {
    return 90.0 - CameraConstants.fov * MathConstants.rad2Deg
  }

  static minTiltReduceFog = 75.0

  static minTimeMoving = 150.0

  static minTimeDoubleZoom = 500.0

  static minTimeSpanTo = 500.0

  static maxTimeSpanTo = 4000.0

  static skyboxMapBorderMinimum = 0.001

  static metersPerPixelAtLatitude = 0.0

  static mapBackgroundColor2D = Color.fromHex("#f2efe9")

  static mapBackgroundColor3D = Color.fromHex("#e1e1e1")

  static satellitePOIColor = new Color(1.0, 1.0, 1.0)

  static satellitePOIHalo = new Color(0.0, 0.0, 0.0)

  static mapBackgroundScaleRatio = 20000.0

  static clusterMaxPointCount = 1000000

  static biasMatrix = new Matrix4(new Float32Array([
    0.5, 0.0, 0.0, 0.0,
    0.0, 0.5, 0.0, 0.0,
    0.0, 0.0, 0.5, 0.0,
    0.5, 0.5, 0.5, 1.0
  ]))

  static FPS = 1000.0 / 15.0

  static buildingOverlayIdPrefix = "_overlay"

  static customBuildingType = "custom_building"

  static touchBoxSize = 8.0

  static zoomStep = 0.25

  static distanceRatioToForceMoveCamera = 3.0 /** ratio with screen size to force move camera when call flyTo() method **/

  static gridIndexExtent = 4096

  static gridIndexN = 4

  static gridIndexPadding = 0
}



export class SymbolConstants {

  static defaultSymbol = "markerDefault"

  static geoJsonLayerId = "geoJsonLayerId"

}

export class LayerConstants {

  /** Map layer */

  static readonly rasterLayerId = "1.0.rasterLayer"

  static readonly surfaceLayerId = "1.1.vector.surfaces"

  static readonly roadsLayerId = "1.2.vector.roads"

  static readonly boundaryLayerId = "1.3.vector.boundaries"

  static readonly labelLayerId = "4.label.tile"

  static readonly rasterOverlayLayerId = "1.4.rasterOverlay"

  static readonly imageOverlayLayerId = "5.imageOverlay"

  static readonly buildingOverlayLayerId = "2.buildingOverlay"

  static readonly pointLayerId = "2.maplink.vector.tile.points"

  static readonly pointOverlayLayerId = "2.maplink.overlay.tile.points"

  static readonly userPOILayerId = "1.maplink.vector.tile.user.poi"

  static readonly buildingLayerId = "2.buildingLayer"

  static readonly userBuildingLayerId = "3.userBuilding.layer"

  /** Tile layer */

  static readonly roadTileLayerId = "roadTileLayer"

  static readonly labelTileLayerId = "labelTileLayer"

  static readonly pointTileLayerId = "pointTileLayer"

  static readonly buildingTileLayerId = "buildingTileLayer"

  static readonly rasterTileLayerId = "rasterTileLayer"
}

export class MathConstants {

  static rad2Deg = 180 / Math.PI

  static deg2Rad = Math.PI / 180.0

  static epsilon = 1e-6
}

export class CameraConstants {

  static fov = 30 * MathConstants.deg2Rad

  static nearPlane = 0.1

  static farPlane = 1000

  static height = 15.5

}

export class PolyConstants {

  static numTrianglesOnRoundCap = 6

  static numTrianglesOnRoundJoin = 5

  static numTrianglesPerCircle = 4
}

export class ParticleConstants {

  static rainFrequency = 0.004

  static rainParticleRotation = -25

  static snowFrequency = 0.004

}

export class WeatherConstants {

  static refreshTime = 60000 /** miliseconds */

  static refreshDistance = 10000 /** meter */

}

export class ColorConstants {
  static skyColors = {
    "Morning": Color.fromHex("cdf9ff"),
    "Noon": Color.fromHex("0783f4"),
    "AfterNoon": Color.fromHex("243a8b"),
    "Evening": Color.fromHex("182863"),
  }

  static fogColors = {
    "Morning": Color.fromHex("FAD8C4"),
    "Noon": Color.fromHex("FAFAFA"),
    "AfterNoon": Color.fromHex("FAA899"),
    "Evening": Color.fromHex("141c36"),
  }

  static lightColors = {
    "Morning": Color.fromHex("#DE8989"),
    "Noon": Color.fromHex("#F8F8F8"),
    "AfterNoon": Color.fromHex("#BE321A"),
    "Evening": Color.fromHex("#1E0032")
  }

  static getSkyColor(name: string): Color {
    return ColorConstants.skyColors[name]
  }

  static getFogColor(name: string): Color {
    return ColorConstants.fogColors[name]
  }

  static getLightColor(name: string): Color {
    return ColorConstants.lightColors[name]
  }
}

export class TimeConstants {

  static morningTime = 6.0

  static noonTime = 12.0

  static afterNoonTime = 16.0

  static eveningTime = 18.0

}

export class FontConstant {

  static fontTextureWidth = 1000

  static fontTextureHeight = 400

  static get fontSize() {
    return 24
  }
}

export class LabelConstant {
  /** Max angle (degree) of 2 segment on path that can create text data **/
  static maxCurvedTextAngle = 22
}
