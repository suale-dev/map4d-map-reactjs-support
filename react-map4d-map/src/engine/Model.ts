import { AttributeInfo } from "./Shader"
import {ResourceReference} from "./ResourceReference"
import {Vector3} from "./Vector3"
import {Point} from "../public/Point"

export class Model extends ResourceReference {

  /**
   *
   * @type {Array}
   */
  attributeInfos: AttributeInfo[] = []

  /**
   * the vertices buffer
   */
  arrayBuffer: WebGLBuffer

  /**
   * the index buffer
   */
  indexBuffer: WebGLBuffer

  /**
   * Number of vertices
   */
  numOfVertices: number

  highestModelPosition: Vector3

  private _points: Point[]

  private _minX: number

  private _maxX: number

  private _minY: number

  private _maxY: number

  private _minZ: number

  private _maxZ: number

  /**
   * create an model with
   * @param gl
   * @param type the item type
   * @param data
   * @param properties
   * @param attributes
   * @param indices the indices
   */
  constructor(private gl: WebGLRenderingContext,
    data: any[] = null,
    properties: string[] = null,
    attributes: string[] = null,
    indices?: number[]) {
    super()
    this._points = []
    if (data) {
      this.numOfVertices = data.length
      let bufferData = []

      /// pack all data
      for (let vertexData of data) {
        for (let property of properties) {
          let propertyData = vertexData[property]
          for (let number of propertyData) {
            bufferData.push(number)
          }
        }
      }

      /// create buffer
      this.arrayBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, this.arrayBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData), gl.STATIC_DRAW)
      gl.bindBuffer(gl.ARRAY_BUFFER, null)

      /// create attribute info
      let vertexData = data[0]
      let stride = 0

      /// create attributes info
      for (let i = 0; i < properties.length; ++i) {
        let property = properties[i]
        let attributeName = attributes[i]

        let propertyData = vertexData[property]
        let size = propertyData.length
        let info = new AttributeInfo(attributeName, size, stride, 0)
        this.attributeInfos.push(info)
        stride += size
      }

      /// update stride
      for (let info of this.attributeInfos) {
        info.stride = stride
      }

      if (indices != null) {
        this.setIndices(indices)
      }
    }
  }

  init(data: any = null, attributeInfos: AttributeInfo[] = null, indices: number[] = null): void {
    if (this.gl == null || data == null || indices == null || attributeInfos == null) {
      console.log("GL or data or dicies is missing")
      return
    }
    let buffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW)
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null)
    this.setIndices(indices)
    this.arrayBuffer = buffer
    this.numOfVertices = indices.length
    this.attributeInfos = attributeInfos
  }

  init3dObjectFormArrayBuffer(vertices: ArrayBuffer = null) {
    if (this.gl == null) {
      console.log("init model Building no data")
      return
    }
    let buffer = this.gl.createBuffer()
    if (vertices == null){
      console.log("Vertices size can not be null")
      return
    }
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW)
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null)
    this.arrayBuffer = buffer
    let stride = 8
    this.numOfVertices = vertices.byteLength / 4 / stride
    this.attributeInfos = [
      new AttributeInfo("a_position", 3, 0, stride),
      new AttributeInfo("a_uv", 2, 3, stride),
      new AttributeInfo("a_normal", 3, 5, stride)
    ]
  }

  init3dObject(data: number[] = null, indices: number[] = null) {
    if (this.gl == null) {
      console.log("init model Building no data")
      return
    }
    let buffer = this.gl.createBuffer()
    if (data == null){
      console.log("Vertices size can not be null")
      return
    }
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW)
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null)
    this.arrayBuffer = buffer
    let stride = 8
    if (indices != null) {
      this.setIndices(indices)
    }
    else {
      this.numOfVertices = data.length / stride
    }
    this.attributeInfos = [
      new AttributeInfo("a_position", 3, 0, stride),
      new AttributeInfo("a_uv", 2, 3, stride),
      new AttributeInfo("a_normal", 3, 5, stride)
    ]
  }

  /**
   * set indices
   * @param indices
   */
  setIndices(indices: number[]) {
    if (indices) {
      let gl = this.gl
      this.indexBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Int16Array(indices), gl.STATIC_DRAW)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
      this.numOfVertices = indices.length
    }
  }

  bind(): void {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.arrayBuffer)
    if (this.indexBuffer) {
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
    }
  }

  unbind(): void {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null)
    if (this.indexBuffer) {
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null)
    }
  }

  /**
   * render this model
   */
  render(type: number) {
    if (this.indexBuffer) {
      this.gl.drawElements(type, this.numOfVertices, this.gl.UNSIGNED_SHORT, 0)
    }
    else if (this.numOfVertices > 0) {
      this.gl.drawArrays(type, 0, this.numOfVertices)
    }
  }

  renderPartial(type: number, first: number, count: number) {
    if (this.indexBuffer) {
      this.gl.drawElements(type, count, this.gl.UNSIGNED_SHORT, first * 2)
    }
    else if (this.numOfVertices > 0) {
      this.gl.drawArrays(type, first, count)
    }
  }

  /**
   * destroy the model to save memory
   */
  destroy() {

    if (this.arrayBuffer) {
      this.gl.deleteBuffer(this.arrayBuffer)
      this.arrayBuffer = null
    }

    if (this.indexBuffer) {
      this.gl.deleteBuffer(this.indexBuffer)
      this.indexBuffer = null
    }

    this.attributeInfos = []
  }

  setHighestModelPosition(highestModelPosition: Vector3): void {
    this.highestModelPosition = highestModelPosition
  }

  getHighestModelPosition(): Vector3 {
    return this.highestModelPosition
  }

  get points(): Point[] {
    return this._points
  }

  set points(value: Point[]) {
    this._points = value
  }

  get maxX(): number {
    return this._maxX
  }

  set maxX(value: number) {
    this._maxX = value
  }

  get maxY(): number {
    return this._maxY
  }

  set maxY(value: number) {
    this._maxY = value
  }

  get maxZ(): number {
    return this._maxZ
  }

  set maxZ(value: number) {
    this._maxZ = value
  }

  get minX(): number {
    return this._minX
  }

  set minX(value: number) {
    this._minX = value
  }

  get minY(): number {
    return this._minY
  }

  set minY(value: number) {
    this._minY = value
  }

  get minZ(): number {
    return this._minZ
  }

  set minZ(value: number) {
    this._minZ = value
  }

}
