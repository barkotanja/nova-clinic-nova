"use client";

import { useEffect, useRef } from "react";

const VERT = `precision mediump float;varying vec2 vUv;attribute vec2 a_position;void main(){vUv=.5*(a_position+1.);gl_Position=vec4(a_position,0.,1.);}`;
const FRAG = `precision mediump float;varying vec2 vUv;uniform sampler2D u_image;uniform float u_time;uniform float u_ratio;uniform float u_img_ratio;vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}float snoise(vec2 v){const vec4 C=vec4(.2113248654,.3660254038,-.5773502692,.0243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=x0.x>x0.y?vec2(1.,0.):vec2(0.,1.);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289(i);vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;m*=1.792842842-.85373472*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);}void main(){vec2 uv=vUv;uv.y=1.-uv.y;vec2 fit=vUv-.5;if(u_ratio>u_img_ratio)fit.x*=u_ratio/u_img_ratio;else fit.y*=u_img_ratio/u_ratio;fit+=.5;fit.y=1.-fit.y;float t=u_time*.00012;float n=snoise(uv*3.+vec2(t*.25,t));float wave=sin((uv.x+uv.y)*28.+t*7.)*.003;fit+=vec2(n*.018+wave,n*.009-wave);vec4 img=texture2D(u_image,fit);float shine=smoothstep(.45,.9,snoise(uv*7.-t))*.12;gl_FragColor=vec4(img.rgb+vec3(.08,.17,.32)*shine,img.a);}`;

function makeShader(gl: WebGLRenderingContext, source: string, type: number) { const item = gl.createShader(type)!; gl.shaderSource(item, source); gl.compileShader(item); if (!gl.getShaderParameter(item, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(item) || "Shader error"); return item; }

export default function WaterRippleImage({ src, className = "" }: { src: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const context = canvas.getContext("webgl", { alpha: false, antialias: true, powerPreference: "low-power" }); if (!context) return;
    const gl: WebGLRenderingContext = context;
    const program = gl.createProgram()!; gl.attachShader(program, makeShader(gl, VERT, gl.VERTEX_SHADER)); gl.attachShader(program, makeShader(gl, FRAG, gl.FRAGMENT_SHADER)); gl.linkProgram(program); gl.useProgram(program);
    const buffer = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW); const position = gl.getAttribLocation(program, "a_position"); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(program, "u_time"); const uRatio = gl.getUniformLocation(program, "u_ratio"); const uImgRatio = gl.getUniformLocation(program, "u_img_ratio"); const uImage = gl.getUniformLocation(program, "u_image");
    const texture = gl.createTexture()!; gl.bindTexture(gl.TEXTURE_2D, texture); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const image = new Image(); image.onload = () => { gl.bindTexture(gl.TEXTURE_2D, texture); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image); gl.uniform1i(uImage, 0); gl.uniform1f(uImgRatio, image.naturalWidth / image.naturalHeight); }; image.src = src;
    const resize = () => { const rect = canvas.getBoundingClientRect(); const dpr = Math.min(devicePixelRatio || 1, 1.35); canvas.width = Math.round(rect.width * dpr); canvas.height = Math.round(rect.height * dpr); gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform1f(uRatio, canvas.width / canvas.height); }; resize(); addEventListener("resize", resize);
    let frame = 0, visible = false, ticks = 0; const render = (now: number) => { if (!visible) { frame = 0; return; } if (ticks++ % 2 === 0) { gl.uniform1f(uTime, now); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); } frame = requestAnimationFrame(render); }; const observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting === true; if (visible && !frame) frame = requestAnimationFrame(render); }, { threshold: .05 }); observer.observe(canvas);
    return () => { observer.disconnect(); removeEventListener("resize", resize); cancelAnimationFrame(frame); gl.deleteTexture(texture); gl.deleteProgram(program); };
  }, [src]);
  return <canvas ref={canvasRef} className={className} aria-label="Animated Nova clinic interior" />;
}
