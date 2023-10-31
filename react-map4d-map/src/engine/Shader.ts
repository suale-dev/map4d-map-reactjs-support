/**
 * attribute information to store
 * data for webgl attribute
 */
export class AttributeInfo {

  /**
   * create an attribute information
   * @param name
   * @param size
   * @param offset
   * @param stride
   */
  constructor(public name: string,
              public size: number,
              public offset: number = 0,
              public stride: number = 0) {
  }
}

/**
 * the shader class - for managing shader
 */
export class Shader {

  /**
   * the program to user
   */
  program: WebGLProgram;

  fragmentShader: WebGLShader;

  vertexShader: WebGLShader;

  /**
   * current texture unit
   * @type {number}
   */
  textureUnit = 0;

  readonly mvpMatrixUniform: WebGLUniformLocation
  readonly timeUniform: WebGLUniformLocation
  readonly enableWaterUniform: WebGLUniformLocation
  readonly textureUniform: WebGLUniformLocation
  readonly waterDisplacementUniform: WebGLUniformLocation
  readonly waterColorUniform: WebGLUniformLocation
  readonly opacityUniform: WebGLUniformLocation
  readonly lightColorUniform: WebGLUniformLocation
  readonly lightPositionUniform: WebGLUniformLocation
  readonly fogStartUniform: WebGLUniformLocation
  readonly fogRangeUniform: WebGLUniformLocation
  readonly fogColorUniform: WebGLUniformLocation
  readonly shadowMvpMatrixUniform: WebGLUniformLocation
  readonly shadowMapUniform: WebGLUniformLocation
  readonly lineWidthUniform: WebGLUniformLocation
  readonly colorUniform: WebGLUniformLocation
  readonly textureScaleUniform: WebGLUniformLocation
  readonly useStrokePatternUniform: WebGLUniformLocation
  readonly useIconUniform: WebGLUniformLocation
  readonly radiusUniform: WebGLUniformLocation
  readonly strokeColorUniform: WebGLUniformLocation
  readonly outerRadiusUniform: WebGLUniformLocation
  readonly innerRadiusUniform: WebGLUniformLocation
  readonly modelMatrixUniform: WebGLUniformLocation
  readonly cameraDirectionUniform: WebGLUniformLocation
  readonly lowerLimitUniform: WebGLUniformLocation
  readonly upperLimitUniform: WebGLUniformLocation
  readonly skyColorUniform: WebGLUniformLocation
  readonly texsizeUniform: WebGLUniformLocation
  readonly pixelScaleUniform: WebGLUniformLocation
  readonly gammaScaleUniform: WebGLUniformLocation
  readonly isHaloUniform: WebGLUniformLocation
  readonly textSizeUniform: WebGLUniformLocation
  readonly useMaskTextureUniform: WebGLUniformLocation
  readonly spriteInfoUniform: WebGLUniformLocation
  readonly paddingUniform: WebGLUniformLocation

  /**
   * dictionary that stores all attributes
   * @type {{}}
   */
  attributes: {[key: string]: number} = {};

  /**
   * create a shader with sources
   * @param gl
   * @param vertexSource
   * @param fragmentSource
   */
  constructor(

    /// web gl object
    private gl: WebGLRenderingContext,
    vertexSource: string,
    fragmentSource: string) {

    /// compile shaders
    this.program = gl.createProgram()

    /// attach shaders
    this.fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, fragmentSource)
    this.vertexShader = this.loadShader(gl.VERTEX_SHADER, vertexSource)
    gl.attachShader(this.program, this.vertexShader)
    gl.attachShader(this.program, this.fragmentShader)

    /// link the shader
    gl.linkProgram(this.program)

    /// check for link errors
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.log("Error linking shader program")
      console.log(gl.getProgramInfoLog(this.program))
    }

    this.loadAttributes()

    /// load all uniforms of this shader
    let uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS)
    for (let i = 0; i < uniformCount; ++i) {
      let uniformInfo = gl.getActiveUniform(this.program, i)
      let name = uniformInfo.name
      let location = gl.getUniformLocation(this.program, name)
      switch (name) {
        case "u_mvpMatrix":
          this.mvpMatrixUniform = location
          break
        case "u_time":
          this.timeUniform = location
          break
        case "u_enableWater":
          this.enableWaterUniform = location
          break
        case "u_texture":
          this.textureUniform = location
          break
        case "u_waterDisplacement":
          this.waterDisplacementUniform = location
          break
        case "u_waterColor":
          this.waterColorUniform = location
          break
        case "u_opacity":
          this.opacityUniform = location
          break
        case "u_light_color":
          this.lightColorUniform = location
          break
        case "u_light_position":
          this.lightPositionUniform = location
          break
        case "u_fogStart":
          this.fogStartUniform = location
          break
        case "u_fogRange":
          this.fogRangeUniform = location
          break
        case "u_fogColor":
          this.fogColorUniform = location
          break
        case "u_shadowMvpMatrix":
          this.shadowMvpMatrixUniform = location
          break
        case "u_shadowMap":
          this.shadowMapUniform = location
          break
        case "u_lineWidth":
          this.lineWidthUniform = location
          break
        case "u_color":
          this.colorUniform = location
          break
        case "u_textureScale":
          this.textureScaleUniform = location
          break
        case "u_useStrokePattern":
          this.useStrokePatternUniform = location
          break
        case "u_useIcon":
          this.useIconUniform = location
          break
        case "u_radius":
          this.radiusUniform = location
          break
        case "u_strokeColor":
          this.strokeColorUniform = location
          break
        case "u_outerRadius":
          this.outerRadiusUniform = location
          break
        case "u_innerRadius":
          this.innerRadiusUniform = location
          break
        case "u_modelMatrix":
          this.modelMatrixUniform = location
          break
        case "u_camera_direction":
          this.cameraDirectionUniform = location
          break
        case "u_lowerLimit":
          this.lowerLimitUniform = location
          break
        case "u_upperLimit":
          this.upperLimitUniform = location
          break
        case "u_skyColor":
          this.skyColorUniform = location
          break
        case "u_texsize":
          this.texsizeUniform = location
          break
        case "u_pixel_scale":
          this.pixelScaleUniform = location
          break
        case "u_gamma_scale":
          this.gammaScaleUniform = location
          break
        case "u_is_halo":
          this.isHaloUniform = location
          break
        case "u_text_size":
          this.textSizeUniform = location
          break
        case "u_useMaskTexture":
          this.useMaskTextureUniform = location
          break
        case "u_spriteInfo":
          this.spriteInfoUniform = location
          break
        case "u_padding":
          this.paddingUniform = location
          break
        default:
          break
      }
    }
  }

  /**
   * load all attributes of this shader
   */
  loadAttributes() {
    let gl = this.gl

    /// get shader attributes
    let attributeCount = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES)

    /// get all uniform info
    for (let i = 0; i < attributeCount; ++i) {
      let attributeInfo = gl.getActiveAttrib(this.program, i)
      let name = attributeInfo.name
      this.attributes[name] = gl.getAttribLocation(this.program, name)
    }
  }


  /**
   * load a shader with source
   * @param type type of the shader | either VERTEX_SHADER or FRAGMENT_SHADER
   * @param source
   * @returns {WebGLShader}
   */
  loadShader(type: number, source: string): WebGLShader {
    let gl = this.gl

    /// create the shader
    let shader = gl.createShader(type)

    /// attach shader source
    gl.shaderSource(shader, source)

    /// compile shader
    gl.compileShader(shader)

    /// if compile error then log the message
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log("Error loading shader")
      console.log(source)
      console.log(gl.getShaderInfoLog(shader))
    }

    return shader
  }

  /**
   * Bind the shader to use
   */
  bind() {

    /// use program
    this.gl.useProgram(this.program)
    this.resetTextureUnit()
  }

  /**
   * Reset texture unit
   */
  resetTextureUnit() {
    this.textureUnit = 0
  }

  /**
   * Set attributes
   * @param attributeInfos
   */
  setAttributes(attributeInfos: AttributeInfo[]) {

    let gl = this.gl

    /// set attributes
    for (let attributeInfo of attributeInfos) {

      /// get the index of attribute
      let index = this.attributes[attributeInfo.name]
      if (index != null) {
        gl.enableVertexAttribArray(index)
        gl.vertexAttribPointer(
          index,
          attributeInfo.size,
          gl.FLOAT,
          false,
          4 * attributeInfo.stride,
          4 * attributeInfo.offset
        )
      }
    }
  }

  setTexture(location: WebGLUniformLocation, textureId: WebGLTexture) {
    this.gl.activeTexture(this.gl.TEXTURE0 + this.textureUnit)
    this.gl.bindTexture(this.gl.TEXTURE_2D, textureId)
    this.gl.uniform1i(location, this.textureUnit)
    this.textureUnit += 1
  }

  /**
   * disable all attributes
   */
  disableAttributes() {
    for (const attribute in this.attributes) {
      this.gl.disableVertexAttribArray(this.attributes[attribute])
    }
  }

  /**
   * destroy this shader to release memory
   */
  destroy() {
    this.attributes = {}
    this.gl.deleteProgram(this.program)
    this.gl.deleteShader(this.vertexShader)
    this.gl.deleteShader(this.fragmentShader)
  }
}
