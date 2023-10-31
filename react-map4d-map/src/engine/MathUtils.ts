import {Vector2} from "./Vector2"

export class MathUtils {
  static clamp(value: number, min: number, max: number) {
    return value < min ? min : (value > max ? max : value)
  }

  static toRadians(angleDegrees: number) {
    return (angleDegrees * Math.PI) / 180.0
  }

  static distance(p1: Vector2, p2: Vector2): number {
    return Math.sqrt((p1.x - p2.x)*(p1.x - p2.x) + (p1.y - p2.y)*(p1.y - p2.y))
  }

  static findNextPowerOf2(n: number) {
    /** decrement `n` (to handle the case when `n` itself is a power of 2) **/
    n = n - 1

    /** calculate the position of the last set bit of `n` **/
    let lg = Math.log2(n)

    /** next power of two will have a bit set at position `lg+1`. **/
    return 1 << lg + 1
  }

  static findPreviousPowerOf2(n: number) {
    return 1 << 31 - Math.clz32(n)
  }
}
