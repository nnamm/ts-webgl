class WebGL {
  initDisplay = (gl: WebGL2RenderingContext, rgba: number[]): void => {
    gl.clearColor(rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.clear(gl.COLOR_BUFFER_BIT);
  };

  createShader = (
    gl: WebGL2RenderingContext,
    type: 'VERTEX_SHADER' | 'FRAGMENT_SHADER',
    source: string
  ): WebGLShader => {
    const shader: WebGLShader | null = gl.createShader(gl[type]);
    if (shader == null) {
      throw new Error('Failed to create shader');
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) === false) {
      throw new Error(`Error compiling shader: ${gl.getShaderInfoLog(shader) as string}`);
    }
    return shader;
  };

  createProgram = (
    gl: WebGL2RenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ): WebGLProgram => {
    const program: WebGLProgram | null = gl.createProgram();
    if (program == null) {
      throw new Error('Failed to create program');
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) {
      throw new Error(`Failed to link shader: ${gl.getProgramInfoLog(program) as string}`);
    }
    gl.useProgram(program);
    return program;
  };

  createVBO = (gl: WebGL2RenderingContext, data: any): WebGLBuffer => {
    const vbo: WebGLBuffer = gl.createBuffer() as WebGLBuffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vbo;
  };

  reBindVBO = (gl: WebGL2RenderingContext, vbo: WebGLBuffer): void => {
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  };

  attributeRegist = (gl: WebGL2RenderingContext, program: WebGLProgram, locName: string, elementSize: number): void => {
    const index: number = gl.getAttribLocation(program, locName);
    const size: number = elementSize;
    const type: number = gl.FLOAT;
    const normalized: boolean = false;
    const stride: number = 0;
    const offset: number = 0;
    gl.enableVertexAttribArray(index);
    gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
  };

  uniformLocRegist = (
    gl: WebGL2RenderingContext,
    program: WebGLProgram,
    mvpMatrix: Float32Array,
    locName: string
  ): void => {
    const uniLocation: WebGLUniformLocation | null = gl.getUniformLocation(program, locName);
    gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);
  };

  drawTriangles = (gl: WebGL2RenderingContext): void => {
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.flush();
  };
}

export default WebGL;
