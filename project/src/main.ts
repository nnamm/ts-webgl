import vs from './shader/vertex.glsl?raw';
import fs from './shader/fragment.glsl?raw';
import MatX from './minMatrix';
import WebGL from './webGL';

const main = (): void => {
  // get WebGL2 context
  const c: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  c.width = 512;
  c.height = 512;
  const gl: WebGL2RenderingContext | null = c.getContext('webgl2');
  if (gl == null) {
    throw new Error('Failed to obtain WebGL context');
  }

  // initialize display settings
  const cgl: WebGL = new WebGL();
  cgl.initDisplay(gl, [0.0, 0.0, 0.0, 0.0]);

  // compile shaders
  const vertexShader: WebGLShader = cgl.createShader(gl, 'VERTEX_SHADER', vs);
  const fragmentShader: WebGLShader = cgl.createShader(gl, 'FRAGMENT_SHADER', fs);

  // create program object & link
  const program: WebGLProgram = cgl.createProgram(gl, vertexShader, fragmentShader);

  // create model / color
  const VERTEX_SIZE: number = 3; // vec3
  const COLOR_SIZE: number = 4; // vec4

  const position: number[] = [0.0, 1.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0];
  const posVBO: WebGLBuffer = cgl.createVBO(gl, position);
  cgl.setAttribute(gl, posVBO, program, 'position', VERTEX_SIZE);

  const color: number[] = [1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0];
  const colVBO: WebGLBuffer = cgl.createVBO(gl, color);
  cgl.setAttribute(gl, colVBO, program, 'color', COLOR_SIZE);

  // matrix transformation
  const m: MatX = new MatX();
  const mMatrix: Float32Array = m.identity(m.create());
  const vMatrix: Float32Array = m.identity(m.create());
  const pMatrix: Float32Array = m.identity(m.create());
  const tmpMatrix: Float32Array = m.identity(m.create());
  const mvpMatrix: Float32Array = m.identity(m.create());
  m.lookAt([0.0, 0.0, 3.0], [0, 0, 0], [0, 1, 0], vMatrix);
  m.perspective(90, c.width / c.height, 0.1, 100, pMatrix);
  m.multiply(pMatrix, vMatrix, tmpMatrix);

  // matrix transformation - 1st model
  m.transrate(mMatrix, [1.5, 0.0, 0.0], mMatrix);
  m.multiply(tmpMatrix, mMatrix, mvpMatrix);
  cgl.setUniformLoc(gl, program, mvpMatrix, 'mvpMatrix');
  cgl.drawTriangle(gl);

  // matrix transformation - 2nd model
  m.identity(mMatrix);
  m.transrate(mMatrix, [-1.5, 0.0, 0.0], mMatrix);
  m.multiply(tmpMatrix, mMatrix, mvpMatrix);
  cgl.setUniformLoc(gl, program, mvpMatrix, 'mvpMatrix');
  cgl.drawTriangle(gl);

  // execute drawing
  gl.flush();
};

window.onload = main;
