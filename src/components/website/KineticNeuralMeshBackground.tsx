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
      + sin(uv.x * frequency + t * 1.2) * 0.05
      + sin(uv.x * (frequency * 0.47) - t * 0.8) * 0.07
      + (n - 0.5) * 0.08
      + offset;

    return smoothstep(width, 0.0, abs(uv.y - curve));
  }

  float star(vec2 uv, vec2 cell, float density) {
    vec2 grid = floor(uv * cell);
    vec2 local = fract(uv * cell) - 0.5;
    float seed = hash(grid);
    float size = mix(0.0025, 0.007, hash(grid + 8.31));
    float sparkle = smoothstep(size, 0.0, length(local));
    float gate = step(1.0 - density, seed);
    float depth = 0.35 + 0.65 * sin(time * (0.22 + seed * 0.2) + seed * 6.2831);
    return sparkle * gate * depth;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 p = uv;
    p.x *= resolution.x / resolution.y;

    vec3 cyan = vec3(0.0, 0.94, 1.0);
    vec3 teal = vec3(0.0, 0.72, 0.78);
    vec3 purple = vec3(0.54, 0.17, 0.89);
    vec3 magenta = vec3(1.0, 0.0, 0.72);

    float pulse = 0.72 + 0.28 * sin(time * 0.7);
    float depthNoise = fbm(vec2(uv.x * 1.15 - time * 0.018, uv.y * 1.35 + time * 0.012));
    float signalA = lineField(uv, -0.16, 0.0038, 6.2, 0.12);
    float signalB = lineField(uv, 0.04, 0.0032, 7.4, 0.15);
    float signalC = lineField(uv, 0.22, 0.0025, 5.6, 0.1);
    float haloA = lineField(uv, -0.16, 0.038, 6.2, 0.12);
    float haloB = lineField(uv, 0.04, 0.032, 7.4, 0.15);
    float haloC = lineField(uv, 0.22, 0.028, 5.6, 0.1);
    float microA = star(uv + vec2(time * 0.003, time * -0.001), vec2(82.0, 48.0), 0.035);
    float microB = star(uv + vec2(time * -0.0015, time * 0.002), vec2(44.0, 30.0), 0.025);

    float rightField = smoothstep(0.22, 0.88, uv.x);
    float lowerFade = 1.0 - smoothstep(0.0, 0.14, uv.y) * 0.35;
    float topFade = 1.0 - smoothstep(0.88, 1.0, uv.y) * 0.4;
    float readability = mix(0.18, 1.0, smoothstep(0.34, 0.86, uv.x));

    vec3 color = vec3(0.0);
    color += mix(purple, teal, depthNoise) * depthNoise * 0.035 * rightField;
    color += cyan * (signalA * 0.42 + haloA * 0.035) * pulse * readability;
    color += purple * (signalB * 0.36 + haloB * 0.038) * readability;
    color += mix(purple, magenta, 0.35) * (signalC * 0.22 + haloC * 0.026) * readability;
    color += mix(cyan, purple, uv.y) * (microA * 0.12 + microB * 0.08) * rightField;
    color *= lowerFade * topFade;

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
