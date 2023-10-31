/**
 * the matrix class
 */
import {Vector3} from "./Vector3"

export class Matrix4 {

  /**
   * create an eye 4x4 matrix
   * @param data
   */
  constructor(public data: Float32Array = new Float32Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0])) {
  }

  setIdentity(x = 1.0, y = 1.0, z = 1.0) {
    this.data[0] = x
    this.data[1] = 0
    this.data[2] = 0
    this.data[3] = 0
    this.data[4] = 0
    this.data[5] = y
    this.data[6] = 0
    this.data[7] = 0
    this.data[8] = 0
    this.data[9] = 0
    this.data[10] = z
    this.data[11] = 0
    this.data[12] = 0
    this.data[13] = 0
    this.data[14] = 0
    this.data[15] = 1.0
    return this
  }

  copy(other: Matrix4) {
    this.data[0] = other.data[0]
    this.data[1] = other.data[1]
    this.data[2] = other.data[2]
    this.data[3] = other.data[3]
    this.data[4] = other.data[4]
    this.data[5] = other.data[5]
    this.data[6] = other.data[6]
    this.data[7] = other.data[7]
    this.data[8] = other.data[8]
    this.data[9] = other.data[9]
    this.data[10] = other.data[10]
    this.data[11] = other.data[11]
    this.data[12] = other.data[12]
    this.data[13] = other.data[13]
    this.data[14] = other.data[14]
    this.data[15] = other.data[15]
    return this
  }

  /**
   * get a translation matrix
   * @param x
   * @param y
   * @param z
   * @returns {Matrix4}
   */
  static translate(x: number, y: number, z: number = 0.0) {

    /// get translation matrix
    return new Matrix4(new Float32Array([
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.,
      0.0, 0.0, 1.0, 0.0,
      x, y, z, 1.0]))
  }

  translate(x: number, y: number, z: number = 0.0) {
    this.data[12] += x
    this.data[13] += y
    this.data[14] += z
    return this
  }

  get position() {
    return new Vector3(this.data[12], this.data[13], this.data[14])
  }

  /**
   * get a rotation matrix around x-axis
   * @param alpha
   * @returns {Matrix4}
   */
  static rotateX(alpha: number) {
    alpha *= Math.PI / 180.0

    let sinA = Math.sin(alpha)
    let cosA = Math.cos(alpha)

    /// get translation matrix
    return new Matrix4(new Float32Array([
      1.0, 0.0, 0.0, 0.0,
      0.0, cosA, sinA, 0.0,
      0.0, -sinA, cosA, 0.0,
      0.0, 0.0, 0.0, 1.0
    ]))
  }

  setRotationX(alpha: number) {
    alpha *= Math.PI / 180.0
    let sinA = Math.sin(alpha)
    let cosA = Math.cos(alpha)
    this.setIdentity()
    this.data[5] = cosA
    this.data[6] = sinA
    this.data[9] = -sinA
    this.data[10] = cosA
    return this
  }


  rotateX(alpha: number) {
    alpha *= Math.PI / 180.0

    let sinA = Math.sin(alpha)
    let cosA = Math.cos(alpha)

    let r1 = this.data[1]
    let r2 = this.data[2]
    this.data[1] = r1 * cosA - r2 * sinA
    this.data[2] = r1 * sinA + r2 * cosA

    r1 = this.data[5]
    r2 = this.data[6]
    this.data[5] = r1 * cosA - r2 * sinA
    this.data[6] = r1 * sinA + r2 * cosA

    r1 = this.data[9]
    r2 = this.data[10]
    this.data[9] = r1 * cosA - r2 * sinA
    this.data[10] = r1 * sinA + r2 * cosA

    r1 = this.data[13]
    r2 = this.data[14]
    this.data[13] = r1 * cosA - r2 * sinA
    this.data[14] = r1 * sinA + r2 * cosA
    return this
  }


  /**
   * get a rotation matrix around y-axis
   * @param alpha
   * @returns {Matrix4}
   */
  static rotateY(alpha: number) {
    alpha *= Math.PI / 180.0

    let sinA = Math.sin(alpha)
    let cosA = Math.cos(alpha)

    /// get translation matrix
    return new Matrix4(new Float32Array([
      cosA, 0.0, sinA, 0.0,
      0.0, 1.0, 0.0, 0.0,
      -sinA, 0.0, cosA, 0.0,
      0.0, 0.0, 0.0, 1.0
    ]))
  }

  setRotationY(alpha: number) {
    alpha *= Math.PI / 180.0
    let sinA = Math.sin(alpha)
    let cosA = Math.cos(alpha)
    this.setIdentity()
    this.data[0] = cosA
    this.data[2] = sinA
    this.data[8] = -sinA
    this.data[10] = cosA
    return this
  }

  rotateY(alpha: number) {
    alpha *= Math.PI / 180.0

    let sinA = Math.sin(alpha)
    let cosA = Math.cos(alpha)

    let r0 = this.data[0]
    let r2 = this.data[2]
    this.data[0] = r0 * cosA -  r2 * sinA
    this.data[2] = r0 * sinA + r2 * cosA

    r0 = this.data[4]
    r2 = this.data[6]
    this.data[4] = r0 * cosA  -  r2 * sinA
    this.data[6] = r0 * sinA + r2 * cosA

    r0 = this.data[8]
    r2 = this.data[10]
    this.data[8] = r0 * cosA  -  r2 * sinA
    this.data[10] = r0 * sinA + r2 * cosA

    r0 = this.data[12]
    r2 = this.data[14]
    this.data[12] = r0 * cosA  -  r2 * sinA
    this.data[14] = r0 * sinA + r2 * cosA
    return this
  }

  /**
   * get a rotation matrix around z-axis
   * @param alpha
   * @returns {Matrix4}
   */
  static rotateZ(alpha: number) {
    alpha *= Math.PI / 180.0

    let sinA = Math.sin(alpha)
    let cosA = Math.cos(alpha)

    /// get translation matrix
    return new Matrix4(new Float32Array([
      cosA, sinA, 0.0, 0.0,
      -sinA, cosA, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    ]))
  }

  setRotationZ(alpha: number) {
    alpha *= Math.PI / 180.0
    let sinA = Math.sin(alpha)
    let cosA = Math.cos(alpha)
    this.setIdentity()
    this.data[0] = cosA
    this.data[1] = sinA
    this.data[4] = -sinA
    this.data[5] = cosA
    return this
  }

  rotateZ(alpha: number) {
    alpha *= Math.PI / 180.0

    let sinA = Math.sin(alpha)
    let cosA = Math.cos(alpha)

    let r0 = this.data[0]
    let r1 = this.data[1]

    this.data[0] = r0 * cosA - r1 * sinA
    this.data[1] = r0 * sinA + r1 * cosA

    r0 = this.data[4]
    r1 = this.data[5]
    this.data[4] = r0 * cosA - r1 * sinA
    this.data[5] = r0 * sinA + r1 * cosA

    r0 = this.data[8]
    r1 = this.data[9]
    this.data[8] = r0 * cosA - r1 * sinA
    this.data[9] = r0 * sinA + r1 * cosA

    r0 = this.data[12]
    r1 = this.data[13]
    this.data[12] = r0 * cosA - r1 * sinA
    this.data[13] = r0 * sinA + r1 * cosA
    return this
  }

  /**
   * get a scale matrix
   * @param x
   * @param y
   * @param z
   * @returns {Matrix4}
   */
  // static scale(x: number, y?: number, z?: number) {
  //   if (y == null) {
  //     y = x
  //     z = x
  //   }

  //   return new Matrix4( new Float32Array([
  //     x, 0.0, 0.0, 0.0,
  //     0.0, y, 0.0, 0.0,
  //     0.0, 0.0, z, 0.0,
  //     0.0, 0.0, 0.0, 1.0
  //   ]))
  // }

  // scale(x: number, y?: number, z?: number) {
  //   if (y == null) {
  //     y = x
  //     z = x
  //   }

  //   let r0 = this.data[0]
  //   let r1 = this.data[1]
  //   let r2 = this.data[2]
  //   this.data[0] = r0 * x
  //   this.data[1] = r1 * y
  //   this.data[2] = r2 * z

  //   r0 = this.data[4]
  //   r1 = this.data[5]
  //   r2 = this.data[6]
  //   this.data[4] = r0 * x
  //   this.data[5] = r1 * y
  //   this.data[6] = r2 * z

  //   r0 = this.data[8]
  //   r1 = this.data[9]
  //   r2 = this.data[10]
  //   this.data[8] = r0 * x
  //   this.data[9] = r1 * y
  //   this.data[10] = r2 * z

  //   r0 = this.data[12]
  //   r1 = this.data[13]
  //   r2 = this.data[14]
  //   this.data[12] = r0 * x
  //   this.data[13] = r1 * y
  //   this.data[14] = r2 * z
  //   return this
  // }

  /**
   * concatenate with other transformation matrix
   * @param matrix
   * @returns {Matrix4}
   */
  multiply(matrix: Matrix4) {
    let result = new Matrix4(new Float32Array([
      0.0, 0.0, 0.0, 0.0,
      0.0, 0.0, 0.0, 0.0,
      0.0, 0.0, 0.0, 0.0,
      0.0, 0.0, 0.0, 0.0
    ]))

    if (matrix == null){
      return result
    }

    for (let i = 0; i < 4; ++i) {
      for (let j = 0; j < 4; ++j) {
        for (let k = 0; k < 4; ++k) {
          result.data[i * 4 + k] += this.data[i * 4 + j] * matrix.data[j * 4 + k]
        }
      }
    }
    return result
  }

  // fconcat(
  //   data0, data1, data2, data3,
  //   data4, data5, data6, data7,
  //   data8, data9, data10, data11,
  //   data12, data13, data14, data15) {
  //   let r0 = this.data[0]
  //   let r1 = this.data[1]
  //   let r2 = this.data[2]
  //   let r3 = this.data[3]
  //   this.data[0] = r0 * data0 + r1 * data4 + r2 * data8 + r3 * data12
  //   this.data[1] = r0 * data1 + r1 * data5 + r2 * data9 + r3 * data13
  //   this.data[2] = r0 * data2 + r1 * data6 + r2 * data10 + r3 * data14
  //   this.data[3] = r0 * data3 + r1 * data7 + r2 * data11 + r3 * data15

  //   r0 = this.data[4]
  //   r1 = this.data[5]
  //   r2 = this.data[6]
  //   r3 = this.data[7]
  //   this.data[4] = r0 * data0 + r1 * data4 + r2 * data8 + r3 * data12
  //   this.data[5] = r0 * data1 + r1 * data5 + r2 * data9 + r3 * data13
  //   this.data[6] = r0 * data2 + r1 * data6 + r2 * data10 + r3 * data14
  //   this.data[7] = r0 * data3 + r1 * data7 + r2 * data11 + r3 * data15

  //   r0 = this.data[8]
  //   r1 = this.data[9]
  //   r2 = this.data[10]
  //   r3 = this.data[11]
  //   this.data[8] = r0 * data0 + r1 * data4 + r2 * data8 + r3 * data12
  //   this.data[9] = r0 * data1 + r1 * data5 + r2 * data9 + r3 * data13
  //   this.data[10] = r0 * data2 + r1 * data6 + r2 * data10 + r3 * data14
  //   this.data[11] = r0 * data3 + r1 * data7 + r2 * data11 + r3 * data15

  //   r0 = this.data[12]
  //   r1 = this.data[13]
  //   r2 = this.data[14]
  //   r3 = this.data[15]
  //   this.data[12] = r0 * data0 + r1 * data4 + r2 * data8 + r3 * data12
  //   this.data[13] = r0 * data1 + r1 * data5 + r2 * data9 + r3 * data13
  //   this.data[14] = r0 * data2 + r1 * data6 + r2 * data10 + r3 * data14
  //   this.data[15] = r0 * data3 + r1 * data7 + r2 * data11 + r3 * data15
  //   return this
  // }

  // concat(matrix: Matrix4) {
  //   if (matrix == null){
  //     return this
  //   }
  //   return this.fconcat(
  //     matrix.data[0], matrix.data[1], matrix.data[2], matrix.data[3],
  //     matrix.data[4], matrix.data[5], matrix.data[6], matrix.data[7],
  //     matrix.data[8], matrix.data[9], matrix.data[10], matrix.data[11],
  //     matrix.data[12], matrix.data[13], matrix.data[14], matrix.data[15]
  //   )
  // }

  /**
   *
   * @param left
   * @param right
   * @param bottom
   * @param top
   * @param near
   * @param far
   * @returns {Matrix4}
   */
  static ortho(left: number, right: number,
    bottom: number, top: number,
    near: number = -100.0, far: number = 100.0) {
    return new Matrix4(new Float32Array([
      2.0/(right - left), 0.0, 0.0, 0.0,
      0.0, 2.0/(top - bottom), 0.0, 0.0,
      0.0, 0.0, -2.0/(far - near), 0.0,
      -(left + right)/(right - left), -(top + bottom)/(top - bottom), -(near + far)/(near - far), 1.0
    ]))
  }

  setOrtho(left: number, right: number,
               bottom: number, top: number,
               near: number = -100.0, far: number = 100.0) {
    this.data[0] = 2.0/(right - left)
    this.data[1] = 0
    this.data[2] = 0
    this.data[3] = 0
    this.data[4] = 0
    this.data[5] = 2.0/(top - bottom)
    this.data[6] = 0
    this.data[7] = 0
    this.data[8] = 0
    this.data[9] = 0
    this.data[10] = -2.0/(far - near)
    this.data[11] = -1
    this.data[12] = -(left + right)/(right - left)
    this.data[13] = -(top + bottom)/(top - bottom)
    this.data[14] = -(near + far)/(near - far)
    this.data[15] = 1.0
    return this
  }

  /**
   * create a perspective matrix
   * @param fov
   * @param aspect
   * @param near
   * @param far
   * @returns {Matrix4}
   */
  static perspective(fov: number, aspect: number, near: number, far: number) {
    let y = Math.tan(fov / 2.0) * near
    let x = y * aspect
    return Matrix4.frustum(-x, x, -y, y, near, far)
  }

  setPerspective(fov: number, aspect: number, near: number, far: number) {
    let y = Math.tan(fov / 2.0) * near
    let x = y * aspect
    return this.setFrustum(-x, x, -y, y, near, far)
  }

  /**
   *
   * @param left
   * @param right
   * @param bottom
   * @param top
   * @param near
   * @param far
   * @returns {Matrix4}
   */
  static frustum(left: number, right: number,
    bottom: number, top: number,
    near: number = -100.0, far: number = 100.0) {
    return new Matrix4(new Float32Array([
      2 * near / (right - left), 0, 0, 0,
      0, 2 * near / (top - bottom), 0, 0,
      (right + left)/(right - left), (top + bottom) / (top - bottom), -(far + near) / (far - near), -1,
      0, 0, -2 * near * far / (far - near), 0
    ]))
  }

  setFrustum(left: number, right: number,
          bottom: number, top: number,
          near: number = -100.0, far: number = 100.0) {
    this.data[0] = 2 * near / (right - left);
    this.data[1] = 0
    this.data[2] = 0
    this.data[3] = 0
    this.data[4] = 0
    this.data[5] = 2 * near / (top - bottom)
    this.data[6] = 0
    this.data[7] = 0
    this.data[8] = (right + left)/(right - left)
    this.data[9] = (top + bottom) / (top - bottom)
    this.data[10] = -(far + near) / (far - near)
    this.data[11] = -1
    this.data[12] = 0
    this.data[13] = 0
    this.data[14] = -2 * near * far / (far - near)
    this.data[15] = 0
  }

  /**
   * transform a vector
   * @param vector
   * @param w include transformation
   */
  transform(vector: Vector3, w: number = 0.0) {

    let x = this.data[0 * 4 + 0] * vector.x
      + this.data[1 * 4 + 0] * vector.y
      + this.data[2 * 4 + 0] * vector.z
      + this.data[3 * 4 + 0] * w

    let y = this.data[0 * 4 + 1] * vector.x
      + this.data[1 * 4 + 1] * vector.y
      + this.data[2 * 4 + 1] * vector.z
      + this.data[3 * 4 + 1] * w

    let z = this.data[0 * 4 + 2] * vector.x
      + this.data[1 * 4 + 2] * vector.y
      + this.data[2 * 4 + 2] * vector.z
      + this.data[3 * 4 + 2] * w

    w = this.data[0 * 4 + 3] * vector.x
      + this.data[1 * 4 + 3] * vector.y
      + this.data[2 * 4 + 3] * vector.z
      + this.data[3 * 4 + 3] * w

    if (w == 0) {
      w = 1
    }

    return new Vector3(
      x / w, y / w, z / w
    )
  }

  /**
   * get the matrix buffer
   * @returns {number[]}
   */
  buffer() {
    return this.data
  }

  /**
   * return look at matrix
   * @param eye
   * @param target
   * @param scale
   * @param up
   * @returns {Matrix4}
   */
  // static lookAt(eye: Vector3, target: Vector3, scale: number = 1, up = new Vector3(0, 0, 1)) {

  //   //compute x, y, z
  //   let zaxis = eye.subtract(target).normalize()
  //   let xaxis = up.cross(zaxis).normalize()
  //   let yaxis = zaxis.cross(xaxis).normalize()
  //   let transformation = Matrix4.translate(-eye.x, -eye.y, -eye.z)
  //   transformation.fconcat(
  //     xaxis.x, yaxis.x, zaxis.x, 0.0,
  //     xaxis.y, yaxis.y, zaxis.y, 0.0,
  //     xaxis.z, yaxis.z, zaxis.z, 0.0,
  //     0.0, 0.0, 0.0, 1.0
  //   )
  //   return transformation.scale(scale)
  // }

  // lookAt(eye: Vector3, target: Vector3, scale: number = 1, up = new Vector3(0, 0, 1)) {
  //   //compute x, y, z
  //   let zaxis = eye.subtract(target).normalize()
  //   let xaxis = up.cross(zaxis).normalize()
  //   let yaxis = zaxis.cross(xaxis).normalize()
  //   this.setIdentity()
  //   this.translate(-eye.x, -eye.y, -eye.z)
  //   this.fconcat(
  //     xaxis.x, yaxis.x, zaxis.x, 0.0,
  //     xaxis.y, yaxis.y, zaxis.y, 0.0,
  //     xaxis.z, yaxis.z, zaxis.z, 0.0,
  //     0.0, 0.0, 0.0, 1.0
  //   )
  //   return this.scale(scale)
  // }

  inverse() {

    // this is a matrix of 3 x 3 or larger
    // calculate inverse using gauss-jordan elimination
    //      http://en.wikipedia.org/wiki/Gaussian_elimination
    //      http://mathworld.wolfram.com/MatrixInverse.html
    //      http://math.uww.edu/~mcfarlat/inverse.htm

    // make a copy of the matrix (only the arrays, not of the elements)
    const rows = 4
    let cols = 4

    let A = this.data.slice()

    // create an identity matrix which in the end will contain the
    // matrix inverse
    let B = new Float32Array([
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    ])

    //eye(rows).valueOf();

    // loop over all columns, and perform row reductions
    for (let c = 0; c < cols; ++c) {

      // element Acc should be non zero. if not, swap content
      // with one of the lower rows
      let r = c
      while (r < rows && A[r * 4 + c] == 0) {
        ++r
      }
      if (r == rows || A[r * 4 + c] == 0) {

        // TODO: in case of zero det, just return a matrix wih Infinity values? (like octave)
        console.log("Cannot calculate inverse, determinant is zero")
        return this
      }
      if (r != c) {
        let Ac = A.slice(c * rows, (c + 1) * rows)
        let Ar = A.slice(r * rows, (r + 1) * rows)
        A.set(Ar, c * rows)
        A.set(Ac, r * rows)
        let Bc = B.slice(c * rows, (c + 1) * rows)
        let Br = B.slice(r * rows, (r + 1) * rows)
        B.set(Br, c * rows)
        B.set(Bc, r * rows)
      }

      // eliminate non-zero values on the other rows at column c
      let Ac = A.slice(c * rows, (c + 1) * rows)
      let Bc = B.slice(c * rows, (c + 1) * rows)

      for (r = 0; r < rows; ++r) {
        let Ar = A.slice(r * rows, (r + 1) * rows)
        let Br = B.slice(r * rows, (r + 1) * rows)
        if(r != c) {

          // eliminate value at column c and row r
          if (Ar[c] != 0) {
            let f = -Ar[c] / Ac[c]

            // add (f * row c) to row r to eliminate the value
            // at column c
            for (let s = c; s < cols; ++s) {
              Ar[s] = Ar[s] + (f * Ac[s])
            }
            A.set(Ar, r * rows)
            for (let s = 0; s < cols; ++s) {
              Br[s] = Br[s] + (f * Bc[s])
            }
            B.set(Br, r * rows)
          }
        }
        else {

          // normalize value at Acc to 1,
          // divide each value on row r with the value at Acc
          let f = Ac[c]
          if (f == 0) {
            console.log("Cannot calculate inverse, determinant is zero")
            return this
          }
          for (let s = c; s < cols; ++s) {
            Ar[s] = Ar[s] / f
          }
          A.set(Ar, r * rows)
          for (let s = 0; s < cols; ++s) {
            Br[s] = Br[s] / f
          }
          B.set(Br, r * rows)
        }
      }
    }
    return new Matrix4(B)
  }
}
