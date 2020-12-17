precision highp float;
precision highp int;
#define HIGH_PRECISION
#define SHADER_NAME ShaderMaterial
#define GAMMA_FACTOR 2
uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;
vec4 LinearToLinear( in vec4 value ) {
    return value;
}
vec4 GammaToLinear( in vec4 value, in float gammaFactor ) {
    return vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );
}
vec4 LinearToGamma( in vec4 value, in float gammaFactor ) {
    return vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );
}
vec4 sRGBToLinear( in vec4 value ) {
    return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 LinearTosRGB( in vec4 value ) {
    return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 RGBEToLinear( in vec4 value ) {
    return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );
}
vec4 LinearToRGBE( in vec4 value ) {
    float maxComponent = max( max( value.r, value.g ), value.b );
    float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );
    return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );
}
vec4 RGBMToLinear( in vec4 value, in float maxRange ) {
    return vec4( value.rgb * value.a * maxRange, 1.0 );
}
vec4 LinearToRGBM( in vec4 value, in float maxRange ) {
    float maxRGB = max( value.r, max( value.g, value.b ) );
    float M = clamp( maxRGB / maxRange, 0.0, 1.0 );
    M = ceil( M * 255.0 ) / 255.0;
    return vec4( value.rgb / ( M * maxRange ), M );
}
vec4 RGBDToLinear( in vec4 value, in float maxRange ) {
    return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );
}
vec4 LinearToRGBD( in vec4 value, in float maxRange ) {
    float maxRGB = max( value.r, max( value.g, value.b ) );
    float D = max( maxRange / maxRGB, 1.0 );
    D = clamp( floor( D ) / 255.0, 0.0, 1.0 );
    return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );
}
const mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );
vec4 LinearToLogLuv( in vec4 value ) {
    vec3 Xp_Y_XYZp = cLogLuvM * value.rgb;
    Xp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );
    vec4 vResult;
    vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;
    float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;
    vResult.w = fract( Le );
    vResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;
    return vResult;
}
const mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );
vec4 LogLuvToLinear( in vec4 value ) {
    float Le = value.z * 255.0 + value.w;
    vec3 Xp_Y_XYZp;
    Xp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );
    Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;
    Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;
    vec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;
    return vec4( max( vRGB, 0.0 ), 1.0 );
}
vec4 mapTexelToLinear( vec4 value ) {
    return LinearToLinear( value );
}
vec4 matcapTexelToLinear( vec4 value ) {
    return LinearToLinear( value );
}
vec4 envMapTexelToLinear( vec4 value ) {
    return LinearToLinear( value );
}
vec4 emissiveMapTexelToLinear( vec4 value ) {
    return LinearToLinear( value );
}
vec4 lightMapTexelToLinear( vec4 value ) {
    return LinearToLinear( value );
}
vec4 linearToOutputTexel( vec4 value ) {
    return LinearToLinear( value );
}
uniform sampler2D image;
varying vec2 vUv;
uniform float aberrationAmount;
uniform float outlineAmount;
uniform float scale;
uniform float lensDistortionAmount;
uniform vec2 texelSize;
uniform float vignetteScale;
float toGrayScale(vec3 colour) {
    return ((0.21*colour.r)+(0.71*colour.g))+(0.07*colour.b);
}
float edgeDetect(sampler2D image, vec2 uv) {
    float x = 0.0;
    float y = 0.0;
    x += (toGrayScale(texture2D(image, uv+vec2(-texelSize.x, -texelSize.y)).rgb)*-1.0);
    x += (toGrayScale(texture2D(image, uv+vec2(-texelSize.x, 0)).rgb)*-2.0);
    x += (toGrayScale(texture2D(image, uv+vec2(-texelSize.x, texelSize.y)).rgb)*-1.0);
    x += (toGrayScale(texture2D(image, uv+vec2(texelSize.x, -texelSize.y)).rgb)*1.0);
    x += (toGrayScale(texture2D(image, uv+vec2(texelSize.x, 0)).rgb)*2.0);
    x += (toGrayScale(texture2D(image, uv+vec2(texelSize.x, texelSize.y)).rgb)*1.0);
    y += (toGrayScale(texture2D(image, uv+vec2(-texelSize.x, -texelSize.y)).rgb)*-1.0);
    y += (toGrayScale(texture2D(image, uv+vec2(0, -texelSize.y)).rgb)*-2.0);
    y += (toGrayScale(texture2D(image, uv+vec2(texelSize.x, -texelSize.y)).rgb)*-1.0);
    y += (toGrayScale(texture2D(image, uv+vec2(-texelSize.x, texelSize.y)).rgb)*1.0);
    y += (toGrayScale(texture2D(image, uv+vec2(0, texelSize.y)).rgb)*2.0);
    y += (toGrayScale(texture2D(image, uv+vec2(texelSize.x, texelSize.y)).rgb)*1.0);
    return sqrt((x*x)+(y*y));
}
void main() {
    vec2 circDirection = vec2(0.5, 0.5)-vUv;
    float circular = length(circDirection);
    vec2 lensUVs = vUv+((normalize(circDirection)*pow(circular, 4.0))*lensDistortionAmount);
    float line = step(0.01, edgeDetect(image, lensUVs));
    float aberrationMultiplier = (aberrationAmount*scale)*circular;
    vec3 colour = vec3(0.0);
    colour.r = texture2D(image, lensUVs+vec2(aberrationMultiplier, 0.0)).r;
    colour.g = texture2D(image, lensUVs).g;
    colour.b = texture2D(image, lensUVs+vec2(-aberrationMultiplier, 0.0)).b;
    float vignette = 1.0-(pow(circular, 2.0)*vignetteScale);
    float lineAmount = ((1.0*pow(circular, 2.0))*outlineAmount)*scale;
    gl_FragColor = vec4((colour*vignette)+(vec3(line)*lineAmount), 1.0);
}
