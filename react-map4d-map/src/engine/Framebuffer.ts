import {Texture, TextureOptions, TextureFiltering, TextureWrapping} from "./Texture"
import {ResourceManager, ShaderEnum, ModelEnum} from "../util/ResourceManager"

export class FrameBuffer {

  frameBufferId: WebGLFramebuffer

  colorTexture: Texture

  depthBuffer: WebGLRenderbuffer

  private isReady = false

  constructor(private gl: WebGLRenderingContext, private width: number, private height: number) {
    this.init()
  }

  init(): boolean {
    let gl = this.gl
    let textureFiltering = new TextureFiltering(gl.NEAREST, gl.NEAREST)
    let textureWrapping = new TextureWrapping(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE)
    let textureColorOptions = new TextureOptions(gl.TEXTURE_2D, gl.RGB, gl.RGB,
      gl.UNSIGNED_BYTE, textureFiltering, textureWrapping)

    this.colorTexture = new Texture(gl, textureColorOptions)
    this.colorTexture.initFrameBufferTexture(this.width || 1, this.height || 1)

    this.depthBuffer = this.gl.createRenderbuffer()
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer)
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width  || 1, this.height  || 1)
    gl.bindRenderbuffer(gl.RENDERBUFFER, null)

    this.frameBufferId = gl.createFramebuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBufferId)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.colorTexture.textureId, 0)
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthBuffer)

    let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
    if (status != gl.FRAMEBUFFER_COMPLETE) {
      switch (status) {
      case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
        console.warn("FRAMEBUFFER_INCOMPLETE_ATTACHMENT")
        break
      case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
        console.warn("FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT")
        break
      case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
        console.warn("FRAMEBUFFER_INCOMPLETE_DIMENSIONS")
        break
      case gl.FRAMEBUFFER_UNSUPPORTED:
        console.warn("FRAMEBUFFER_UNSUPPORTED")
        break
      default:
        console.warn("Unknown framebuffer issue")
        break
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      return false
    }
    this.isReady = true
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    return true
  }

  bind(): void {
    if (!this.isReady) return
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBufferId)
  }

  unbind(): void {
    if (!this.isReady) return
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null)
  }

  drawDebug(): void {
    // if (!this.isReady) return
    // this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    //
    // let shader = ResourceManager.Instance.getShader(ShaderEnum.DEBUG_SELECTION_SHADER)
    // let model = ResourceManager.Instance.getModel(ModelEnum.SELECTION_DEBUG_MODEL)
    //
    // shader.bind()
    // shader.setAttributes(model.attributeInfos)
    //
    // shader.setTexture(shader.textureUniform, this.colorTexture.textureId)
    // model.render()
    // shader.resetTextureUnit()
  }

  destroy() {
    if (!this.gl) return
    this.colorTexture && this.colorTexture.destroy()
    this.gl.deleteRenderbuffer(this.depthBuffer)
    this.gl.deleteFramebuffer(this.frameBufferId)
    this.colorTexture = null
    this.depthBuffer = null
    this.frameBufferId = null
  }
}
