// Default Shader
// Rob Sawyer
// @see https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram
#include <packing>

// ThreeJS defaults
// uniform mat4 viewMatrix;
// uniform vec3 cameraPosition;

uniform float time;
uniform float progress;

uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

// uniform sampler2D tDiffuse;
uniform sampler2D depthInfo; 

varying float vDepth;
varying vec2 vUv;
varying vec2 vUv1;
varying vec3 vPosition;
uniform float cameraNear;
uniform float cameraFar;

float PI = 3.14159265358979323846264338;

float readDepth( sampler2D depthSampler, vec2 coord ) {
	float fragCoordZ = texture2D( depthSampler, coord ).x;
	float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
	return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
}

void main() {
    // @see https://community.khronos.org/t/getting-the-normal-with-dfdx-and-dfdy/70177
    // vec3 X = dFdx(vNormal);
    // vec3 Y = dFdy(vNormal);
    // vec3 normal = normalize(cross(X,Y));

    // float diffuse = dot(normal, vec3(1.));
    // vec4 t = texture2D(texture1, vUv);
    // // gl_FragColor = vec4(vUv, 0.0, 1.);
    // gl_FragColor = t;
    // gl_FragColor =  vec4(diffuse);

    // gl_FragColor = vec4(vUv,0.0,1.);

    // vec3 diffuse = texture2D( tDiffuse, vUv ).rgb;
    float depth = readDepth( depthInfo, vUv1 );

	float tomix = smoothstep(0.2, 1., vDepth);

	gl_FragColor.rgb = mix(vec3(0.495, 0.165, 0.234), 2. * vec3(0.000, 0.001, 0.242), tomix);
	// gl_FragColor.rgb = mix(vec3(0.495, 0.165, 0.234),vec3(1.),tomix);

	gl_FragColor.a = 1.0;
}