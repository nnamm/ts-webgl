class MatX {
  create = (): Float32Array => {
    return new Float32Array(16);
  };

  identity = (dest: Float32Array): Float32Array => {
    dest[0] = 1;
    dest[1] = 0;
    dest[2] = 0;
    dest[3] = 0;
    dest[4] = 0;
    dest[5] = 1;
    dest[6] = 0;
    dest[7] = 0;
    dest[8] = 0;
    dest[9] = 0;
    dest[10] = 1;
    dest[11] = 0;
    dest[12] = 0;
    dest[13] = 0;
    dest[14] = 0;
    dest[15] = 1;
    return dest;
  };

  multiply = (mat1: Float32Array, mat2: Float32Array, dest: Float32Array): Float32Array => {
    const a: number = mat1[0];
    const b: number = mat1[1];
    const c: number = mat1[2];
    const d: number = mat1[3];
    const e: number = mat1[4];
    const f: number = mat1[5];
    const g: number = mat1[6];
    const h: number = mat1[7];
    const i: number = mat1[8];
    const j: number = mat1[9];
    const k: number = mat1[10];
    const l: number = mat1[11];
    const m: number = mat1[12];
    const n: number = mat1[13];
    const o: number = mat1[14];
    const p: number = mat1[15];
    const A: number = mat2[0];
    const B: number = mat2[1];
    const C: number = mat2[2];
    const D: number = mat2[3];
    const E: number = mat2[4];
    const F: number = mat2[5];
    const G: number = mat2[6];
    const H: number = mat2[7];
    const I: number = mat2[8];
    const J: number = mat2[9];
    const K: number = mat2[10];
    const L: number = mat2[11];
    const M: number = mat2[12];
    const N: number = mat2[13];
    const O: number = mat2[14];
    const P: number = mat2[15];
    dest[0] = A * a + B * e + C * i + D * m;
    dest[1] = A * b + B * f + C * j + D * n;
    dest[2] = A * c + B * g + C * k + D * o;
    dest[3] = A * d + B * h + C * l + D * p;
    dest[4] = E * a + F * e + G * i + H * m;
    dest[5] = E * b + F * f + G * j + H * n;
    dest[6] = E * c + F * g + G * k + H * o;
    dest[7] = E * d + F * h + G * l + H * p;
    dest[8] = I * a + J * e + K * i + L * m;
    dest[9] = I * b + J * f + K * j + L * n;
    dest[10] = I * c + J * g + K * k + L * o;
    dest[11] = I * d + J * h + K * l + L * p;
    dest[12] = M * a + N * e + O * i + P * m;
    dest[13] = M * b + N * f + O * j + P * n;
    dest[14] = M * c + N * g + O * k + P * o;
    dest[15] = M * d + N * h + O * l + P * p;
    return dest;
  };

  lookAt = (eye: number[], center: number[], up: number[], dest: Float32Array): Float32Array => {
    const eyeX: number = eye[0];
    const eyeY: number = eye[1];
    const eyeZ: number = eye[2];
    const upX: number = up[0];
    const upY: number = up[1];
    const upZ: number = up[2];
    const centerX: number = center[0];
    const centerY: number = center[1];
    const centerZ: number = center[2];
    if (eyeX === centerX && eyeY === centerY && eyeZ === centerZ) {
      return this.identity(dest);
    }
    let x0, x1, x2, y0, y1, y2, z0, z1, z2, l;
    z0 = eyeX - center[0];
    z1 = eyeY - center[1];
    z2 = eyeZ - center[2];
    l = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= l;
    z1 *= l;
    z2 *= l;
    x0 = upY * z2 - upZ * z1;
    x1 = upZ * z0 - upX * z2;
    x2 = upX * z1 - upY * z0;
    l = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (Number.isNaN(l)) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      l = 1 / l;
      x0 *= l;
      x1 *= l;
      x2 *= l;
    }
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    l = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (Number.isNaN(l)) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      l = 1 / l;
      y0 *= l;
      y1 *= l;
      y2 *= l;
    }
    dest[0] = x0;
    dest[1] = y0;
    dest[2] = z0;
    dest[3] = 0;
    dest[4] = x1;
    dest[5] = y1;
    dest[6] = z1;
    dest[7] = 0;
    dest[8] = x2;
    dest[9] = y2;
    dest[10] = z2;
    dest[11] = 0;
    dest[12] = -(x0 * eyeX + x1 * eyeY + x2 * eyeZ);
    dest[13] = -(y0 * eyeX + y1 * eyeY + y2 * eyeZ);
    dest[14] = -(z0 * eyeX + z1 * eyeY + z2 * eyeZ);
    dest[15] = 1;
    return dest;
  };

  perspective = (fovy: number, aspect: number, near: number, far: number, dest: Float32Array): Float32Array => {
    const t: number = near * Math.tan((fovy * Math.PI) / 360);
    const r: number = t * aspect;
    const a: number = r * 2;
    const b: number = t * 2;
    const c: number = far - near;
    dest[0] = (near * 2) / a;
    dest[1] = 0;
    dest[2] = 0;
    dest[3] = 0;
    dest[4] = 0;
    dest[5] = (near * 2) / b;
    dest[6] = 0;
    dest[7] = 0;
    dest[8] = 0;
    dest[9] = 0;
    dest[10] = -(far + near) / c;
    dest[11] = -1;
    dest[12] = 0;
    dest[13] = 0;
    dest[14] = -(far * near * 2) / c;
    dest[15] = 0;
    return dest;
  };
}

export default MatX;
