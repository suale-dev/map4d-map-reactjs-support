import {Vector3} from "./Vector3"

export class Color {
  private _buffer: Float32Array

  /**
   * create a color
   */
  constructor(red: number = 0.0,
    green: number = 0.0,
    blue: number = 0.0,
              public alpha: number = 1.0) {
    this._buffer = new Float32Array([red, green, blue])
  }

  /**
   * get the buffer
   */
  rgbBuffer(): Float32Array {
    return this._buffer
  }

  /**
   * get the buffer
   */
  buffer(): Float32Array {
    return new Float32Array([this.red, this.green, this.blue, this.alpha])
  }

  get red() {
    return this._buffer[0]
  }

  get green() {
    return this._buffer[1]
  }

  get blue() {
    return this._buffer[2]
  }

  /**
   * string style for canvas
   * @return {string}
   */
  get rgba() {
    return "rgba(" + this.red * 255 + "," + this.green * 255 + "," + this.blue * 255 + "," + this.alpha + ")"
  }

  /**
   * create color from hex string
   */
  static fromHex(hexString = "000000") {
    if (hexString.length == 4 || hexString.length == 7 || hexString.length == 9) {
      hexString = hexString.substring(1, hexString.length)
    }
    if (hexString.length == 3) {
      hexString = hexString.split("").map(x => x + x).join("")
    }

    let colorCode = parseInt(hexString, 16)

    if (hexString.length == 6) {
      return new Color(
        (colorCode >> 16) / 255,
        ((colorCode >> 8) & 255) / 255,
        (colorCode & 255) / 255
      )
    }
    else {
      return new Color(
        ((colorCode >> 24) & 255) / 255,
        ((colorCode >> 16) & 255) / 255,
        ((colorCode >> 8) & 255) / 255,
        (colorCode & 255) / 255
      )
    }
  }

  static fromInt(colorCode = 0) {
    if (colorCode < 0) {
      colorCode = 0
    }
    return new Color(
      ((colorCode >> 16) & 255) / 255,
      ((colorCode >> 8) & 255) / 255,
      (colorCode & 255) / 255
    )
  }

  static fromVec3(color: Vector3) {
    return new Color(
      color.x,
      color.y,
      color.z
    )
  }

  static mix(a: Color, b: Color, factor: number) {
    return new Color(
      a.red * factor + b.red * (1 - factor),
      a.green* factor + b.green * (1 - factor),
      a.blue * factor + b.blue * (1 - factor),
      a.alpha * factor + b.alpha * (1 - factor)
    )
  }

  get code() {
    let float2hex = (f: number) => {
      let hex = Math.floor(f * 255).toString(16)
      hex = hex.length == 1 ? "0" + hex : hex
      hex = hex.length > 2 ? hex.substr(0, 2) : hex
      return hex
    }
    return "#" + float2hex(this.red) + float2hex(this.green) + float2hex(this.blue) + float2hex(this.alpha)
  }

  static isValid(colorString: string): boolean{
    return /^#?([0-9A-Fa-f]){6,8}$/i.test(colorString)
  }
}
