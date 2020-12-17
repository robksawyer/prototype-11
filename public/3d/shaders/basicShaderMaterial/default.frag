// Default Shader
// Rob Sawyer
// @see https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram

// ThreeJS defaults
// uniform mat4 viewMatrix;
// uniform vec3 cameraPosition;

uniform float time;
uniform float progress;

uniform vec4 resolution;

varying vec2 vUv;

float PI = 3.14159265358979323846264338;


void main() { 
    gl_FragColor = vec4(vUv, 0.0, 1.);
}





