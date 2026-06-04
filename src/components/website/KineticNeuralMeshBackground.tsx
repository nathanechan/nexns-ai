import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec2 position;

  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform vec2 resolution;
  uniform float time;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rotate = mat2(0.8, -0.6, 0.6, 0.8);

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = rotate * p * 2.04 + 17.0;
      amplitude *= 0.5;
    }

    return value;
  }

  float lineField(vec2 uv, float offset, float width, float frequency, float speed) {
    float t = time * speed;
    float n = fbm(vec2(uv.x * 2.2 + t, uv.y * 1.8 - t * 0.5));
    float curve = 0.5
      + sin(uv.x * frequency + t * 2.0) * 0.12
      + sin(uv.x * (frequency * 0.47) - t * 1.35) * 0.18
      + (n - 0.5) * 0.22
      + offset;

    return smoothstep(width, 0.0, abs(uv.y - curve));
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 p = uv;
    p.x *= resolution.x / resolution.y;

    vec3 cyan = vec3(0.0, 0.94, 1.0);
    vec3 teal = vec3(0.0, 0.72, 0.78);
    vec3 purple = vec3(0.54, 0.17, 0.89);
    vec3 magenta = vec3(1.0, 0.0, 0.72);

    float pulse = 0.72 + 0.28 * sin(time * 2.4);
    float bottomBand = smoothstep(1.04, 0.55, uv.y);
    float dataGrain = step(0.54, noise(floor(vec2(uv.x * 230.0, uv.y * 120.0)) + time * 0.25));
    float scan = fbm(vec2(uv.x * 4.2 - time * 0.62, uv.y * 7.5 + time * 0.2));

    float ribbonA = lineField(uv, -0.08, 0.014, 9.0, 0.48);
    float ribbonB = lineField(uv, 0.02, 0.011, 11.0, 0.62);
    float ribbonC = lineField(uv, 0.13, 0.008, 7.0, 0.72);
    float haloA = lineField(uv, -0.08, 0.075, 9.0, 0.48);
    float haloB = lineField(uv, 0.02, 0.065, 11.0, 0.62);
    float haloC = lineField(uv, 0.13, 0.05, 7.0, 0.72);

    vec3 color = vec3(0.0);
    color += mix(purple, cyan, uv.x) * bottomBand * (0.16 + scan * 0.58);
    color += mix(magenta, cyan, scan) * bottomBand * dataGrain * 0.09;
    color += cyan * haloA * 0.16 * pulse;
    color += purple * haloB * 0.22;
    color += magenta * haloC * 0.14;
    color += cyan * ribbonA * 1.25;
    color += purple * ribbonB * 1.18;
    color += magenta * ribbonC * 0.95;

    float leftReadability = smoothstep(0.68, 0.24, uv.x);
    color *= mix(1.0, 0.22, leftReadability);
    color *= 1.0 - smoothstep(0.0, 0.22, uv.y) * 0.55;
    color *= 1.0 - smoothstep(0.78, 1.0, uv.y) * 0.35;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function KineticNeuralMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    const resolutionLocation = gl.getUniformLocation(program, "resolution");
    const timeLocation = gl.getUniformLocation(program, "time");

    let frame = 0;
    const startedAt = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };

    const render = (now: number) => {
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, (now - startedAt) * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="kinetic-neural-mesh absolute inset-0 h-full w-full bg-black"
      aria-hidden="true"
    />
  );
}
