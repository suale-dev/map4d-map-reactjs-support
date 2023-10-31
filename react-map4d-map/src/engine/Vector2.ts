/**
 * class vector 2
 */
export class Vector2 {

  /**
   * create a vector 2 class
   * @param x
   * @param y
   */
  constructor(public x: number = 0.0,
              public y: number = 0.0) {
  }

  clone() {
    return new Vector2(this.x, this.y)
  }

  /**
   * get the length of the vector
   * @returns {number}
   */
  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  /**
   * @return {number}
   */
  get lengthSq(): number {
    return this.x * this.x + this.y * this.y
  }

  /**
   * normalize the vector
   * @returns {Vector2}
   */
  normalize(): Vector2 {
    let length = this.length
    let x = 0.0
    let y = 0.0

    if (length > 0) {
      x = this.x / length
      y = this.y / length
    }

    return new Vector2(x, y)
  }

  /**
   * set value of the vector
   * @param a
   */
  set(a: Vector2) {
    this.x = a.x
    this.y = a.y
  }

  /**
   * invert the vector direction
   * @returns {Vector2}
   */
  invert() {
    return new Vector2(-this.x, -this.y)
  }

  /**
   * rotate 90
   * @returns {Vector2}
   */
  rotate90() {
    return new Vector2(this.y, -this.x)
  }

  /**
   * add to another vector
   * @param a
   * @returns {Vector2}
   */
  add(a: Vector2) {
    return new Vector2(a.x + this.x, a.y + this.y)
  }

  /**
   * subtract with another vector
   * @param a
   * @returns {Vector2}
   */
  subtract(a: Vector2) {
    if (!a) {
      return this.clone()
    }
    return new Vector2(this.x - a.x,  this.y - a.y)
  }

  /**
   * multiply by a number
   * @param a
   * @returns {Vector2}
   */
  multiply(a: number) {
    return new Vector2(a * this.x, a * this.y)
  }

  /**
   * rotate by an angle
   * @param a
   * @returns {Vector2}
   */
  rotateBy(a: number) {
    let cos = Math.cos(a * Math.PI / 180)
    let sin = Math.sin(a * Math.PI / 180)
    return new Vector2(this.x * cos - this.y * sin, this.x * sin + this.y * cos)
  }

  rotateByRadian(a: number): Vector2 {
    let cos = Math.cos(a)
    let sin = Math.sin(a)
    return new Vector2(this.x * cos - this.y * sin, this.x * sin + this.y * cos)
  }

  /**
   * multiply by a vector
   * @param a
   * @returns {Vector2}
   */
  cross(a: Vector2) {
    return this.x * a.y - this.y * a.x
  }

  /**
   * dot a vector
   * @param a
   * @returns {number}
   */
  dot(a: Vector2) {
    return a.x * this.x + a.y * this.y
  }

  static perp(v1: number[], v2: number[]) {
    return new Vector2(v2[1] - v1[1],
      v1[0] - v2[0])
  }

  static neg(v: Vector2) {
    return new Vector2(-v.x, -v.y)
  }
}
