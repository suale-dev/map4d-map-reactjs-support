import { ProjectionMercator } from "../map/ProjectionMercator"
import { MathUtils } from "../engine/MathUtils"
import { Vector2 } from "../engine/Vector2"
import { ILatLng, LatLng } from "../models/LatLng"

export class CoordinateTransformer {

  private coordinates: LatLng[] = []

  constructor(coordinates: ILatLng[]) {
    this.coordinates = coordinates.map(coordinate => LatLng.convert(coordinate))
  }

  setCoordinates(coordinates: ILatLng[]): void {
    this.coordinates = coordinates.map(coordinate => LatLng.convert(coordinate))
  }

  addCoordinates(coordinates: ILatLng[]): void {
    coordinates.forEach(coordinate => this.coordinates.push(LatLng.convert(coordinate)))
  }

  rotate(degree: number, anchor: ILatLng = null): LatLng[] {
    if (this.coordinates.length <= 1) {
      return this.coordinates.slice()
    }
    let center = null
    if (anchor != null) {
      center = LatLng.convert(center)
    }
    else {
      center = this.center
    }
    let centerInMeters = ProjectionMercator.convertToMeterFromLatLng(center)
    let transformedCoordinates: LatLng[] = []
    let degreeInRadians = MathUtils.toRadians(degree)
    this.coordinates.forEach(coordinate => {
      let point = ProjectionMercator.convertToMeterFromLatLng(coordinate)
      point.x -= centerInMeters.x
      point.y -= centerInMeters.y

      let x = point.x
      let y = point.y
      point.x = (x * Math.cos(degreeInRadians) - y * Math.sin(degreeInRadians))
      point.y = (x * Math.sin(degreeInRadians) + y * Math.cos(degreeInRadians))

      transformedCoordinates.push(ProjectionMercator.convertToLatLngFromMeter(
        new Vector2(centerInMeters.x + point.x, centerInMeters.y + point.y)))
    })
    return transformedCoordinates
  }

  translate(target: ILatLng, anchor: ILatLng = null): LatLng[] {
    if (this.coordinates.length <= 0) {
      return []
    }
    let newCenter = LatLng.convert(target)
    let oldCenter = null
    if (anchor != null) {
      oldCenter = LatLng.convert(anchor)
    }
    else {
      oldCenter = this.center
    }

    let transformedCoordinates: LatLng[] = []
    let translateVectorX = newCenter.lng - oldCenter.lng
    let translateVectorY = newCenter.lat - oldCenter.lat
    this.coordinates.forEach(coordinate => {
      transformedCoordinates.push(new LatLng(coordinate.lat + translateVectorY,
        coordinate.lng + translateVectorX))
    })
    return transformedCoordinates
  }

  scale(scale: number, anchor: ILatLng = null): LatLng[] {
    if (this.coordinates.length <= 1) {
      return this.coordinates.slice()
    }
    let center = null
    if (anchor != null) {
      center = LatLng.convert(anchor)
    }
    else {
      center = this.center
    }

    let centerInMeters = ProjectionMercator.convertToMeterFromLatLng(center)
    let transformedCoordinates: LatLng[] = []
    this.coordinates.forEach(coordinate => {
      let point = ProjectionMercator.convertToMeterFromLatLng(coordinate)
      point.x -= centerInMeters.x
      point.y -= centerInMeters.y
      point.x *= scale
      point.y *= scale
      transformedCoordinates.push(ProjectionMercator.convertToLatLngFromMeter(
        new Vector2(centerInMeters.x + point.x, centerInMeters.y + point.y)))
    })
    return transformedCoordinates
  }

  get center(): LatLng {
    if (this.coordinates.length == 0) {
      return null as unknown as LatLng
    }
    let center = new LatLng(0, 0)
    for (let i = 0; i < this.coordinates.length; ++i) {
      center.lat += this.coordinates[i].lat
      center.lng += this.coordinates[i].lng
    }
    center.lat /= this.coordinates.length
    center.lng /= this.coordinates.length
    return center
  }
}