import {ResourceReference} from "./ResourceReference"
import {Color} from "./Color"

export class TextureFiltering {

  min?: number

  mag?: number

  constructor(min: number, mag: number) {
    this.min = min
    this.mag = mag
  }
}

export class TextureWrapping {

  wraps: number

  wrapt: number

  constructor(wraps: number, wrapt: number) {
    this.wraps = wraps
    this.wrapt = wrapt
  }
}

export class TextureOptions{
  target: number

  internalFormat: number

  format: number

  type: number

  filtering: TextureFiltering

  wrapping: TextureWrapping

  constructor(target: number, internalFormat: number, format: number, type: number,
    filtering: TextureFiltering, wrapping: TextureWrapping){
    this.target = target
    this.internalFormat = internalFormat
    this.format = format
    this.type = type
    this.filtering = filtering
    this.wrapping = wrapping
  }
}

/**
 * class for managing texture 2d
 */
export class Texture extends ResourceReference {

  /**
   * the texture Id
   */
  textureId: WebGLTexture

  options: TextureOptions

  width: number

  height: number

  isLoaded: boolean

  constructor(private gl: WebGLRenderingContext, options: TextureOptions = null) {
    super()
    this.options = options
    if (options == null){
      this.initDefaultTextureOptions()
    }
    this.isLoaded = false
    this.init()
  }

  private initDefaultTextureOptions(): void {
    let gl = this.gl
    let textureFiltering = new TextureFiltering(gl.LINEAR_MIPMAP_LINEAR, gl.LINEAR)
    let textureWrapping = new TextureWrapping(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE)
    this.options = new TextureOptions(gl.TEXTURE_2D, gl.RGBA, gl.RGBA,
      gl.UNSIGNED_BYTE, textureFiltering, textureWrapping)
  }

  private init() {
    let gl = this.gl

    this.textureId = gl.createTexture()

    this.loadColor(Color.fromHex("FFFFFF"))
  }

  bind(): void {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureId)
  }

  unbind(): void {
    this.gl.bindTexture(this.gl.TEXTURE_2D, null)
  }

  loadColor(color: Color) {
    let gl = this.gl
    this.width = 1
    this.height = 1

    if (this.textureId != null) {
      gl.bindTexture(gl.TEXTURE_2D, this.textureId)

      let data = new Uint8Array([color.red * 255, color.green * 255, color.blue * 255, color.alpha * 255])

      gl.texImage2D(this.options.target, 0, this.options.internalFormat, this.width, this.height, 0,
        this.options.format, this.options.type, data)

      gl.texParameteri(this.options.target, gl.TEXTURE_WRAP_S, this.options.wrapping.wraps)
      gl.texParameteri(this.options.target, gl.TEXTURE_WRAP_T, this.options.wrapping.wrapt)

      this.applyFilter()

      gl.bindTexture(gl.TEXTURE_2D, null)
    }
  }

  loadImageFromArrayBuffer(data: ArrayBuffer, width: number, height: number, flip: boolean = false, onLoad: Function = null) {
    let gl = this.gl
    this.width = width
    this.height = height
    if (this.textureId != null) {
      gl.bindTexture(gl.TEXTURE_2D, this.textureId)

      let imageData = new ImageData(new Uint8ClampedArray(data), width, height)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flip ? 1 : 0)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageData)

      this.applyFilter()

      gl.bindTexture(gl.TEXTURE_2D, null)

      this.isLoaded = true
      onLoad && onLoad()
    }
  }

  loadImage(url: string, onLoad: Function = null, flip: boolean = true) {
    if (url == null) {
      console.warn("loadImageFromUrl: URL is null")
      onLoad && onLoad()
      return
    }

    let gl = this.gl
    let image = new Image()
    image.crossOrigin = "anonymous"
    image.src = url

    image.onload = () => {
      this.width = image.width
      this.height = image.height

      if (this.textureId != null) {
        gl.bindTexture(gl.TEXTURE_2D, this.textureId)
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flip ? 1 : 0)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

        this.applyFilter()

        gl.bindTexture(gl.TEXTURE_2D, null)
        this.isLoaded = true
      }

      onLoad && onLoad()
    }
  }

  loadImageDataArray(data: Uint8Array, width: number, height: number, filterParam: number, onLoad: Function = null) {
    let gl = this.gl
    this.width = width
    this.height = height
    if (this.textureId != null) {
      gl.bindTexture(gl.TEXTURE_2D, this.textureId)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filterParam)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filterParam)
      gl.bindTexture(gl.TEXTURE_2D, null)
      this.isLoaded = true
    }
    onLoad && onLoad()
  }

  /**
   * destroy the map texture
   */
  destroy() {
    if (this.textureId) {
      this.gl.deleteTexture(this.textureId)
      this.textureId = null
    }
  }

  applyFilter(isGenerateMipmap: boolean = true): void {

    let gl = this.gl

    gl.texParameteri(this.options.target, gl.TEXTURE_MAG_FILTER, this.options.filtering.mag)

    if (this.isPowerOf2(this.width) && this.isPowerOf2(this.height) && isGenerateMipmap) {
      gl.texParameteri(this.options.target, gl.TEXTURE_MIN_FILTER, this.options.filtering.min)
      gl.generateMipmap(this.options.target)
    }
    else {
      let minFilter = this.options.filtering.min
      if (minFilter == gl.LINEAR_MIPMAP_LINEAR || minFilter == gl.LINEAR_MIPMAP_NEAREST){
        minFilter = gl.LINEAR
      }
      else if (minFilter == gl.NEAREST_MIPMAP_LINEAR || minFilter == gl.NEAREST_MIPMAP_NEAREST){
        minFilter = gl.NEAREST
      }
      gl.texParameteri(this.options.target, gl.TEXTURE_MIN_FILTER, minFilter)
    }

  }

  initFrameBufferTexture(width: number, height: number){
    let gl = this.gl

    this.width = width
    this.height = height

    this.textureId = gl.createTexture()

    gl.bindTexture(this.options.target, this.textureId)

    gl.texImage2D(this.options.target, 0, this.options.internalFormat, this.width, this.height, 0,
      this.options.format, this.options.type, null)

    gl.texParameteri(this.options.target, gl.TEXTURE_WRAP_S, this.options.wrapping.wraps)
    gl.texParameteri(this.options.target, gl.TEXTURE_WRAP_T, this.options.wrapping.wrapt)

    this.applyFilter(false)

    gl.bindTexture(gl.TEXTURE_2D, null)
    this.isLoaded = true
  }

  isPowerOf2(value) {
    return (value & (value - 1)) == 0
  }
}
