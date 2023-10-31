/**
 * class vector 3
 */
export class Vector3 {

  /**
   * create a vector 3 class
   * @param x
   * @param y
   * @param z
   */
  constructor(public x: number = 0.0,
              public y: number = 0.0,
              public z: number = 0.0) {
  }

  clone() {
    return new Vector3(this.x, this.y, this.z)
  }

  buffer(): Float32Array {
    return new Float32Array([this.x, this.y, this.z])
  }

  /**
   * get the length of the vector
   * @returns {number}
   */
  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }

  /**
   * @return {number}
   */
  get lengthSq(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }

  /**
   * normalize the vector
   * @returns {Vector3}
   */
  normalize(): Vector3 {
    let length = this.length
    let x = 0.0
    let y = 0.0
    let z = 0.0

    if (length > 0) {
      x = this.x / length
      y = this.y / length
      z = this.z / length
    }

    return new Vector3(x, y, z)
  }

  /**
   * set value of the vector
   * @param a
   */
  set(a: Vector3) {
    this.x = a.x
    this.y = a.y
    this.z = a.z
  }

  /**
   * invert the vector direction
   * @returns {Vector3}
   */
  invert() {
    return new Vector3(-this.x, -this.y, -this.z)
  }

  /**
   * rotate 90
   * @returns {Vector3}
   */
  rotate90() {
    return new Vector3(this.y, -this.x, this.z)
  }

  /**
   * add to another vector
   * @param a
   * @returns {Vector3}
   */
  add(a: Vector3) {
    return new Vector3(a.x + this.x, a.y + this.y, a.z + this.z)
  }

  /**
   * subtract with another vector
   * @param a
   * @returns {Vector3}
   */
  subtract(a: Vector3) {
    if (!a) {
      return this.clone()
    }
    return new Vector3(this.x - a.x,  this.y - a.y, this.z - a.z)
  }

  /**
   * multiply by a number
   * @param a
   * @returns {Vector3}
   */
  multiply(a: number) {
    return new Vector3(a * this.x, a * this.y, a * this.z)
  }

  /**
   * rotate by an angle
   * @param a
   * @returns {Vector3}
   */
  rotateBy(a: number) {
    let cos = Math.cos(a * Math.PI / 180)
    let sin = Math.sin(a * Math.PI / 180)
    return new Vector3(this.x * cos - this.y * sin, this.x * sin + this.y * cos)
  }

  /**
   * multiply by a vector
   * @param a
   * @returns {Vector3}
   */
  cross(a: Vector3) {
    return new Vector3(
      this.y * a.z - this.z * a.y,
      this.z * a.x - this.x * a.z,
      this.x * a.y - this.y * a.x
    )
  }

  /**
   * dot a vector
   * @param a
   * @returns {number}
   */
  dot(a: Vector3) {
    return a.x * this.x + a.y * this.y + a.z * this.z
  }

  static perp(v1: number[], v2: number[]) {
    return new Vector3(v2[1] - v1[1],
      v1[0] - v2[0])
  }

  static neg(v: Vector3) {
    return new Vector3(-v.x, -v.y, -v.z)
  }
}
