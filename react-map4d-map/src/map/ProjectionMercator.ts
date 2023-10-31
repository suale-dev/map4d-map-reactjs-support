import {Vector2} from "../engine/Vector2"
import {MathUtils} from "../engine/MathUtils"
import { MapConstants, MathConstants } from "../models/MapConstants"
import { LatLng } from "../models/LatLng"

export class ProjectionMercator {

  /**
   * ok for test
   * @param latLng
   * @param worldSize
   */
  private static projectInternal(latLng: LatLng, worldSize: number) : Vector2 {
    let latitude = MathUtils.clamp(latLng.lat, MapConstants.minLatitude, MapConstants.maxLatitude)
    return new Vector2(
      MapConstants.maxLongitude + latLng.lng,
      MapConstants.maxLongitude - MathConstants.rad2Deg
        * Math.log(Math.tan(Math.PI / 4 + latitude * Math.PI / MapConstants.maxDegrees))
    ).multiply(worldSize / MapConstants.maxDegrees)
  }

  /**
   * ok for test
   * @param latLng
   */
  static convertToMeterFromLatLng(latLng: LatLng): Vector2 {
    let constrainedLatitude = MathUtils.clamp(latLng.lat, MapConstants.minLatitude, MapConstants.maxLatitude)
    let constrainedLongitude = latLng.lng
    let m = 1 - 1e-15
    let f = MathUtils.clamp(Math.sin(MathConstants.deg2Rad * constrainedLatitude), -m, m)
    let easting = MapConstants.radiusEarthMeters * constrainedLongitude * MathConstants.deg2Rad
    let northing = 0.5 * MapConstants.radiusEarthMeters * Math.log((1 + f) / (1 - f))
    return new Vector2(easting, northing)
  }

  /**
   * ok for test
   * @param meters
   */
  static convertToLatLngFromMeter(meters: Vector2): LatLng {
    let latitude = (2 * Math.atan(Math.exp(meters.y / MapConstants.radiusEarthMeters)) - (Math.PI / 2.0))
                    * MathConstants.rad2Deg
    let longitude = meters.x * MathConstants.rad2Deg / MapConstants.radiusEarthMeters
    return new LatLng(latitude, longitude)
  }

  /**
   * ok for test
   * @param latLng
   * @param zoom
   */
  static projectZoom(latLng: LatLng, zoom: number): Vector2 {
    return this.projectInternal(latLng, 1 << zoom)
  }


}
