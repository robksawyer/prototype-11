precision highp float;
precision highp int;
#define HIGH_PRECISION
#define SHADER_NAME ShaderMaterial
#define VERTEX_TEXTURES
#define GAMMA_FACTOR 2
#define MAX_BONES 0
#define BONE_TEXTURE
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;
#ifdef USE_INSTANCING
    attribute mat4 instanceMatrix;
#endif
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
#ifdef USE_TANGENT
    attribute vec4 tangent;
#endif
#ifdef USE_COLOR
    attribute vec3 color;
#endif
#ifdef USE_MORPHTARGETS
    attribute vec3 morphTarget0;
    attribute vec3 morphTarget1;
    attribute vec3 morphTarget2;
    attribute vec3 morphTarget3;
    #ifdef USE_MORPHNORMALS
        attribute vec3 morphNormal0;
        attribute vec3 morphNormal1;
        attribute vec3 morphNormal2;
        attribute vec3 morphNormal3;
    #else
        attribute vec3 morphTarget4;
        attribute vec3 morphTarget5;
        attribute vec3 morphTarget6;
        attribute vec3 morphTarget7;
    #endif
#endif
#ifdef USE_SKINNING
    attribute vec4 skinIndex;
    attribute vec4 skinWeight;
#endif

attribute vec4 packedMorphTarget0;
attribute vec4 packedMorphTarget1;
attribute vec4 packedMorphTarget2;
attribute vec4 packedMorphTarget3;
attribute vec4 packedMorphTarget4;
attribute vec4 packedMorphTarget5;
attribute vec4 packedMorphTarget6;
attribute vec4 packedMorphTarget7;
attribute vec4 packedMorphTarget8;
attribute vec4 packedMorphTarget9;
attribute vec4 packedMorphTarget10;
attribute vec4 packedMorphTarget11;
attribute vec4 packedMorphTarget12;
#ifdef USE_LESS_MORPHS
    attribute vec4 packedMorphTarget13;
#endif
uniform float baseInfluence;
uniform float influences[19];
varying vec3 vNormal;
vec3 addUpInfluences() {
    vec3 pos = vec3(0.0);
    pos += (packedMorphTarget0.xyz*influences[0]);
    pos += (vec3(packedMorphTarget0.w, packedMorphTarget1.xy)*influences[1]);
    pos += (vec3(packedMorphTarget1.zw, packedMorphTarget2.x)*influences[2]);
    pos += (packedMorphTarget2.yzw*influences[3]);
    pos += (packedMorphTarget3.xyz*influences[4]);
    pos += (vec3(packedMorphTarget3.w, packedMorphTarget4.xy)*influences[5]);
    pos += (vec3(packedMorphTarget4.zw, packedMorphTarget5.x)*influences[6]);
    pos += (packedMorphTarget5.yzw*influences[7]);
    pos += (packedMorphTarget6.xyz*influences[8]);
    pos += (vec3(packedMorphTarget6.w, packedMorphTarget7.xy)*influences[9]);
    pos += (vec3(packedMorphTarget7.zw, packedMorphTarget8.x)*influences[10]);
    pos += (packedMorphTarget8.yzw*influences[11]);
    pos += (packedMorphTarget9.xyz*influences[12]);
    pos += (vec3(packedMorphTarget9.w, packedMorphTarget10.xy)*influences[13]);
    pos += (vec3(packedMorphTarget10.zw, packedMorphTarget11.x)*influences[14]);
    pos += (packedMorphTarget11.yzw*influences[15]);
    pos += (packedMorphTarget12.xyz*influences[16]);
    #ifdef USE_LESS_MORPHS
        pos += (vec3(packedMorphTarget12.w, packedMorphTarget13.xy)*influences[17]);
    #endif
    return pos;
}
void main() {
    vNormal = normalMatrix*normal;
    vec3 pos = vec3(position)+addUpInfluences();
    gl_Position = (projectionMatrix*modelViewMatrix)*vec4(pos, 1.0);
}
