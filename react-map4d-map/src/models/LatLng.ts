import { ClassType, Map4dObject } from "./Map4dObject"
import { MapConstants, MathConstants } from './MapConstants';


export class LatLng extends Map4dObject {

  /** Latitude, in degrees. */
  lat: number

  /** Longitude, in degrees. */
  lng: number

  constructor(lat: number, lng: number) {
    super(ClassType.LATLNG)
    this.lat = lat
    this.lng = lng
  }

  /**
   * Comparison function.
   * @param other
   */
  equals(other: LatLng): boolean {
    return this.lat == other.lat && this.lng == other.lng
  }

  valid() {
    return isFinite(this.lat) && Math.abs(this.lat) <= 90
    //tile wrap
  }

  /**
   * Converts to string representation.
   */
  toString(): string {
    return "(" + this.lat + ", " + this.lng + ")"
  }

  static convert(input: ILatLng): LatLng {
    if(Map4dObject.isClassType(input, ClassType.LATLNG)) {
      return input as LatLng
    }
    if (Array.isArray(input) && (input.length === 2)) {
      return new LatLng(Number(input[1]), Number(input[0]))
    }
    if (!Array.isArray(input) && typeof input === "object" && input !== null && "lat" in input && "lng" in input) {
      return new LatLng(
        Number(input.lat),
        Number(input.lng))
    }
    throw new Error("`ILngLat` argument must be specified as a LngLat instance, an object " +
                            "{lat: <lat>, lng: <lng>}, or an array of [<lng>, <lat>]")
  }
  
  distanceTo(target: ILatLng): number {
    if (target == null) {
      return 0;
    }
    let desc = LatLng.convert(target)
    let latStartRadian = MathConstants.deg2Rad * this.lat
    let longStartRadian = MathConstants.deg2Rad * this.lng
    let latDescRadian = MathConstants.deg2Rad * desc.lat
    let longDescRadian = MathConstants.deg2Rad * desc.lng
    let u = Math.sin((latDescRadian - latStartRadian)/2)
    let v = Math.sin((longDescRadian - longStartRadian)/2)

    // Distance between two latLngs in meters
    return  2.0 * MapConstants.radiusEarthMeters *
      Math.asin(Math.sqrt(u * u + Math.cos(latStartRadian) * Math.cos(latDescRadian) * v * v))
  }

  normalize(): LatLng {
    let sign = this.lat > 0 ? -1 : 1
    let lat = (this.lat - sign * 90) % 180 + 90 * sign
    sign = this.lng > 0 ? -1 : 1
    let lng = (this.lng - sign * 180) % 380 + 180 * sign
    return new LatLng(lat, lng)
  }

  /**
   * add to another LatLng
   * @param a
   * @returns {LatLng}
   */
  add(a: LatLng) {
    return new LatLng(this.lat + a.lat, this.lng + a.lng).normalize()
  }

  /**
   * subtract with another LatLng
   * @param a
   * @returns {LatLng}
   */
  subtract(a: LatLng) {
    if (!a) {
      return this
    }
    return new LatLng(this.lat - a.lat,  this.lng - a.lng).normalize()
  }
}

export type ILatLng  = LatLng | {lat: number, lng: number} | [number, number] | null
