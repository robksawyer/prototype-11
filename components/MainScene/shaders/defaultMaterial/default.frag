// Default Shader
// Rob Sawyer
// @see https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram
#define GLSLIFY 1

// ThreeJS defaults
// uniform mat4 viewMatrix;
// uniform vec3 cameraPosition;

uniform float time;
uniform float progress;

uniform sampler2D texture1; 
uniform vec4 resolution;

varying vec2 vUv;

float PI = 3.14159265358979323846264338;

// https://www.iquilezles.org/www/articles/distfunctions/distfunctions.htm
float sdSphere( vec3 p, float r )
{
  return length(p)-r;
}

float sdf (vec3 p) {
    return sdSphere(p, 0.4);
}

void main() { 
    vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
    vec3 camPos = vec3(0., 0., 2.);
    vec3 ray = normalize(vec3( (vUv - vec2(0.5) ) * resolution.zw, -1));

    vec3 rayPos = camPos;
    float t = 0.;
    float tMax = 5.;
    for(int i = 0; i < 256; ++i) {
        vec3 pos = camPos + t * ray; // t is scalar value
        float h = sdf(pos);
        if (h < 0.0001 || t > tMax) break;
        // the marching part
        t += h;
    }

    vec3 color = vec3(0.);
    if (t<tMax) {
        color = vec3(1.);
    }
    
    gl_FragColor = vec4(newUV, 0.0, 1.);
}





