export class ShaderSource {

  static lightEffect = `
    vec4 calculateLightEffect(vec3 normal, vec3 light, vec3 camera, vec3 light_color, vec4 material_color) {
        vec4 ambient_color = vec4(0.03, 0.03, 0.03, 0);
        material_color += ambient_color;
        
        float light_intensity = 1.0;
        vec3 diffuse = vec3(1.0, 1.0, 1.0);
        float diffuseCoefficient1 = max(0.0, dot(normal, light));
        diffuseCoefficient1 = diffuseCoefficient1 * light_intensity;
        diffuseCoefficient1 = clamp(diffuseCoefficient1, 0.0, 1.0);

        float diffuseCoefficient2 = max(0.0, dot(normal, camera));
        diffuseCoefficient2 = clamp(diffuseCoefficient2, 0.0, 1.0);
        
        vec4 finalColor = vec4(mix(material_color.rgb, diffuseCoefficient1 * light_color, diffuseCoefficient1 * 0.35), material_color.a);
        finalColor = vec4(mix(finalColor.rgb, diffuseCoefficient2 * material_color.rgb, diffuseCoefficient2 * 0.35), finalColor.a);   
        
        return finalColor;
    }
  `

  static waterFragment = `
    vec4 calculateWaterColor(vec4 tileColor, sampler2D waterDispl, sampler2D waterColor, vec2 uv, float time) {
      float eps = 0.01;
      if (abs(tileColor.x - 0.639) < eps && abs(tileColor.y - 0.8) < eps && abs(tileColor.z - 1.0) < eps) {
        vec2 displacement = texture2D( waterDispl, 4.0 * vec2(uv.x, uv.y + time )).rg;
        vec2 offset = (displacement * 2.0 - 1.0) * 0.2;
        vec4 color = texture2D(waterColor, uv * 2.0 + offset);
        return color;
      } else {
        return tileColor;
      } 
    }
  `

  static basicVS = `
attribute vec3 a_position;
attribute vec2 a_uv;

uniform mat4 u_mvpMatrix;

varying vec2 v_uv;

void main() {
  gl_Position = u_mvpMatrix * vec4(a_position, 1.0);
  v_uv = a_uv;
}
   `

  static basicFS = `
precision mediump float;

uniform sampler2D u_texture;
varying vec2 v_uv;
uniform sampler2D u_waterDisplacement;
uniform sampler2D u_waterColor;
uniform float u_time;
uniform float u_opacity;
uniform int u_enableWater;
 
vec4 calculateWaterColor(vec4 tileColor, sampler2D waterDispl, sampler2D waterColor, vec2 uv, float time);

void main() {
    vec4 tileColor = texture2D(u_texture, v_uv);     
  
    vec4 vertexColor = u_enableWater == 0 ? tileColor: calculateWaterColor(tileColor, u_waterDisplacement, u_waterColor, v_uv, u_time);
    gl_FragColor = vec4(vertexColor.rgb, vertexColor.a * u_opacity);
}  
  ` + ShaderSource.waterFragment

  static rasterFogVS = `
attribute vec3 a_position;
attribute vec2 a_uv;

uniform mat4 u_mvpMatrix;

varying vec2 v_uv;

void main() {
  gl_Position = u_mvpMatrix * vec4(a_position, 1.0);
  v_uv = a_uv;
}
   `

  static rasterFogFS = `
precision mediump float;

uniform sampler2D u_texture;
uniform vec3 u_light_color;
uniform vec3 u_light_position;
uniform float u_fogStart;
uniform float u_fogRange;
uniform vec3 u_fogColor;

varying vec2 v_uv;

uniform sampler2D u_waterDisplacement;
uniform sampler2D u_waterColor;
uniform float u_time;
uniform float u_opacity;
uniform int u_enableWater;
 
vec4 calculateWaterColor(vec4 tileColor, sampler2D waterDispl, sampler2D waterColor, vec2 uv, float time);

void main() {
    float light_intensity = 1.0;
    
    // initialize
    vec3 diffuse = vec3(1.0, 1.0, 1.0);
    vec3 v_normal = vec3(0.0, 0.0, 1.0);
    vec4 tileColor = texture2D(u_texture, v_uv); 
    
    // diffuse
    float diffuseCoefficient = max(0.0, dot(normalize(v_normal), normalize(u_light_position)));
    diffuseCoefficient = mix((1.0 - light_intensity), max((0.5 + light_intensity), 1.0), diffuseCoefficient);
    diffuse = clamp(diffuseCoefficient * u_light_color, mix(vec3(0.0), vec3(0.3), 1.0 - u_light_color), vec3(1.0));
    vec4 vertexLightColor = vec4(mix(tileColor.rgb, diffuseCoefficient * diffuse, 0.3), tileColor.a);
    
    vec4 vertexColor = u_enableWater == 0 ? tileColor: calculateWaterColor(tileColor, u_waterDisplacement, u_waterColor, v_uv, u_time);
    vertexColor = vec4(mix(vertexColor.rgb, vertexLightColor.rgb, 0.2), vertexColor.a);
    
    // fog
    float dist = (gl_FragCoord.z / gl_FragCoord.w);
    float visibility = (dist - u_fogStart) / u_fogRange;
    visibility = clamp(visibility, 0.0, 1.0);
    gl_FragColor = vec4(mix(vertexColor.rgb, u_fogColor, visibility), vertexColor.a * u_opacity);
} 
  ` + ShaderSource.waterFragment

  static polylineVS = `
attribute vec2 a_position;
attribute vec2 a_extrude;
attribute vec2 a_uv;

uniform float u_lineWidth;
uniform mat4 u_mvpMatrix;

varying vec2 v_uv;

void main() {
  vec2 delta = (u_lineWidth / 2.0) * a_extrude;
  v_uv = a_uv;
  gl_Position = u_mvpMatrix * vec4(a_position + delta, 0.0, 1.0);
}
  `

  static polylineFS = `
precision mediump float;

uniform vec4 u_color;
uniform float u_textureScale;
uniform bool u_useStrokePattern;
uniform bool u_useIcon;
uniform sampler2D u_texture;

varying vec2 v_uv;

void main() {
  if (u_useStrokePattern) {
    vec2 line_st = vec2(v_uv.x * u_textureScale, v_uv.y);
    vec4 line_color = texture2D(u_texture, line_st);
    if (u_useIcon) {
      gl_FragColor = line_color;
    }
    else {
      gl_FragColor = vec4(u_color.rgb, line_color.a * u_color.a);
    }
  }
  else {
    gl_FragColor = u_color;
  }
}
  `

  static fillVS = `
attribute vec2 a_position;

uniform mat4 u_mvpMatrix;

void main() {
  gl_Position = u_mvpMatrix * vec4(a_position, 0.0, 1.0);
}
  `

  static fillFS = `
precision mediump float;

uniform vec4 u_color;

void main() {
    gl_FragColor = u_color;
}
  `

  static geoJsonVS = `
attribute vec2 a_position;
attribute vec2 a_extrude;

uniform float u_lineWidth;
uniform mat4 u_mvpMatrix;

void main() {
  vec2 delta = (u_lineWidth / 2.0) * a_extrude;
  gl_Position = u_mvpMatrix * vec4(a_position + delta, 0.0, 1.0); 
}
  `

  static geoJsonFS = `
precision mediump float;

uniform vec4 u_color;

void main() {
    gl_FragColor = u_color;
}
  `

  static circleVS = `
  precision highp float;
attribute vec2 a_extrude;

uniform float u_radius;
uniform mat4 u_mvpMatrix;

varying vec2 v_extrude;

void main() {
    vec2 circleExtrude = u_radius * a_extrude;
    gl_Position = u_mvpMatrix * vec4(circleExtrude, 0, 1);
    v_extrude = circleExtrude;        
}
  `

  static circleFS = `
precision highp float;

uniform vec4 u_color;
uniform mat4 u_mvpMatrix;
uniform float u_strokeWidth;
uniform vec4 u_strokeColor;
uniform float u_outerRadius;
uniform float u_innerRadius;

varying vec2 v_extrude;

void main() {      
 
    float dist = length(v_extrude);
    if (dist - u_outerRadius >= 0.0) {
      discard;
    }            
    if (dist - u_innerRadius >= 0.0){
      gl_FragColor = u_strokeColor;
    }
    else {
      gl_FragColor = u_color;
    }
}
  `

  static markerVS = `
attribute vec3 a_position;
attribute vec2 a_uv;

uniform mat4 u_mvpMatrix;

varying vec2 v_uv;

void main() {
  gl_Position = u_mvpMatrix * vec4(a_position, 1.0);
  v_uv = a_uv;
}
  `

  static markerFS = `
precision mediump float;

uniform sampler2D u_texture;
uniform vec4 u_color;
uniform vec4 u_spriteInfo;
uniform vec2 u_padding;
uniform int u_useMaskTexture;

varying vec2 v_uv;

void main() {
  if (u_useMaskTexture > 0) {
    float spriteWidth = u_spriteInfo.x;
    float spriteHeight = u_spriteInfo.y;
    float col = u_spriteInfo.z;
    float row = u_spriteInfo.w;

    vec2 mask_uv = vec2(spriteWidth * v_uv.x, 1.0 - spriteHeight * (1.0 - v_uv.y));
    vec4 mask = texture2D(u_texture, mask_uv);

    if (u_useMaskTexture == 1) {
      vec2 icon_uv = vec2(spriteWidth * (col + v_uv.x) + u_padding.x * col, 1.0 - spriteHeight * (row + 1.0 - v_uv.y) - u_padding.y * row);
      vec4 icon = texture2D(u_texture, icon_uv);

      // gl_FragColor = vec4(mix(u_color.xyz, icon.xyz, icon.a), mask.g);
      // gl_FragColor = u_color * mask.r + icon * icon.a;
      gl_FragColor = vec4(mix(u_color.xyz * mask.r, icon.xyz, icon.a), mask.r);
    }
    else {
      gl_FragColor = u_color * mask.r;
    }
  }
  else {
    gl_FragColor = texture2D(u_texture, v_uv);
  }
}
  `

  static buildingVS = `
attribute vec3 a_position;
attribute vec2 a_uv;
attribute vec3 a_normal;

uniform mat4 u_modelMatrix;
uniform mat4 u_mvpMatrix;

varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;

void main() {
    gl_Position = u_mvpMatrix * vec4(a_position, 1.0);
    v_uv = a_uv;
    // Convert normal vector to world space (make sure that we don't translate it)
    v_normal = normalize(vec3((u_modelMatrix * vec4(a_normal, 0.0)).xyz));
    v_position = (u_modelMatrix * vec4(a_position, 1.0)).xyz;
}
  `

  static buildingFS = `
precision mediump float;

uniform sampler2D u_texture;
uniform vec3 u_light_color;
uniform vec3 u_light_position;
uniform float u_fogStart;
uniform float u_fogRange;
uniform vec3 u_fogColor;
uniform vec3 u_camera_direction;

varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;

vec4 calculateLightEffect(vec3 normal, vec3 light, vec3 camera, vec3 light_color, vec4 material_color);

void main() {
    vec4 material_color = texture2D(u_texture, v_uv);
    vec4 vertexColor = calculateLightEffect(normalize(v_normal), normalize(u_light_position), normalize(u_camera_direction), u_light_color, material_color);
    
    float distance = distance(v_position, vec3(0));
    // fog
    float visibility = (distance - u_fogStart) / u_fogRange;
    visibility = clamp(visibility, 0.0, 1.0);
    gl_FragColor = vec4(mix(vertexColor.rgb, u_fogColor, visibility), vertexColor.a);
    
    if (gl_FragColor.a < 0.3 || visibility >= 0.5) {
      discard;
    }
}
  ` + ShaderSource.lightEffect

  static buildingSelectionVS = `
attribute vec3 a_position;
uniform mat4 u_mvpMatrix;

void main() {
    gl_Position = u_mvpMatrix * vec4(a_position, 1.0);
}
  `

  static buildingSelectionFS = `
precision mediump float;
uniform vec3 u_color;

void main() {
    gl_FragColor = vec4(u_color, 1.0);
}
  `

  static debugSelectionVS = `
    attribute vec3 a_position;
    attribute vec2 a_uv;
    
    varying vec2 v_uv;
    
    void main() {
      gl_Position = vec4(a_position, 1.0);
      v_uv = a_uv;
    }
  `

  static debugSelectionFS = `
    precision mediump float;
    
    uniform sampler2D u_texture;
    varying vec2 v_uv;
    
    void main() {
        gl_FragColor = texture2D(u_texture, vec2(v_uv.x , 1.0 - v_uv.y));
    }

  `

  static skyVS = `
attribute vec3 a_position;
attribute vec2 a_uv;
uniform mat4 u_mvpMatrix;

varying vec3 v_position;

void main() { 
  gl_Position = u_mvpMatrix * vec4(a_position, 1.0);
  gl_Position.z = gl_Position.w - 0.000001;  
  v_position = gl_Position.xyz;
}
  `

  static skyFS = `
precision mediump float;
uniform float u_lowerLimit;
uniform float u_upperLimit;

uniform vec3 u_skyColor;
uniform vec3 u_fogColor;

varying vec3 v_position;

void main() {
  float factor = (v_position.y - u_lowerLimit) / (u_upperLimit - u_lowerLimit);       
  factor = clamp(factor, 0.05, 1.0);  
  if (v_position.y > u_lowerLimit) {
    gl_FragColor = vec4(mix(u_fogColor.rgb, u_skyColor.rgb, factor), 1.0);
  } else {
    discard;
  }      
}
  `

  static shadowMappingVS = `
    attribute vec3 a_position;

    uniform mat4 u_shadowMvpMatrix;
    
    varying vec4 v_position;

    void main() {
      gl_Position = u_shadowMvpMatrix * vec4(a_position, 1.0);
      v_position = gl_Position;
    }
   `

  static shadowMappingFS = `
    precision mediump float;
    
    varying vec4 v_position;
    
    vec4 pack(float depth) {
        depth *= (256.0 * 256.0 * 256.0 - 1.0) / (256.0 * 256.0 * 256.0);
        vec4 encode = fract(depth * vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0) );
        return vec4(encode.xyz - encode.yzw / 256.0, encode.w ) + 1.0 / 512.0;
    }

    void main() {
      float depth = v_position.z / v_position.w;
      depth = (depth + 1.0) / 2.0;
      gl_FragColor = pack(depth);
    }  
  `

  static shadowFS = `
  
    float unpack(vec4 pack) {
      float depth = dot(pack, 1.0 / vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0));
      return depth * (256.0 * 256.0 * 256.0) / (256.0 * 256.0 * 256.0 - 1.0);
    }
  
    float calculateShadowFactor(sampler2D shadowMap, vec4 shadowCoord, float bias) {
      float shadowFactor = 1.0;
      vec4 shadowMapPosition = shadowCoord / shadowCoord.w;
      bool inShadowArea = (shadowMapPosition.x >= 0.0 && shadowMapPosition.x <= 1.0) && 
      (shadowMapPosition.y >= 0.0 && shadowMapPosition.y <= 1.0) && 
      (shadowMapPosition.z >= 0.0 && shadowMapPosition.z <= 1.0);
      if (inShadowArea) {
        float distanceFromLight = unpack(texture2D(shadowMap, shadowMapPosition.xy));	
        if (distanceFromLight  + bias < shadowMapPosition.z  ) {
          shadowFactor = 0.7;   
        }
      }
      return shadowFactor;
    }
    
  `

  static raster3DWithShadowVS = `
attribute vec3 a_position;
attribute vec2 a_uv;

uniform mat4 u_mvpMatrix;
uniform mat4 u_shadowMvpMatrix;

varying vec2 v_uv;
varying vec4 v_shadowCoord;
varying vec3 v_position;

void main() {
  gl_Position = u_mvpMatrix * vec4(a_position, 1.0);
  v_uv = a_uv;
  // Calculate shadow coordinate
  v_shadowCoord = u_shadowMvpMatrix * vec4(a_position, 1.0);
}
   `

  static raster3DWithShadowFS = `
precision mediump float;

uniform sampler2D u_texture;
// The shadow map
uniform sampler2D u_shadowMap;
uniform float u_fogStart;
uniform float u_fogRange;
uniform vec3 u_fogColor;
uniform vec3 u_light_color;
uniform vec3 u_light_position;

uniform sampler2D u_waterDisplacement;
uniform sampler2D u_waterColor;
uniform float u_time;
uniform float u_opacity;
uniform int u_enableWater;
    
varying vec2 v_uv;
varying vec4 v_shadowCoord;
varying vec3 v_position;
    
float calculateShadowFactor(sampler2D shadowMap, vec4 shadowCoord, float bias);
vec4 calculateWaterColor(vec4 tileColor, sampler2D waterDispl, sampler2D waterColor, vec2 uv, float time);

void main() {
    float light_intensity = 1.0;

    // initialize
    vec3 diffuse = vec3(1.0, 1.0, 1.0);
    vec3 v_normal = vec3(0.0, 0.0, 1.0);
    vec4 tileColor = texture2D(u_texture, v_uv);
    
    // diffuse
    float diffuseCoefficient = max(0.0, dot(normalize(v_normal), normalize(u_light_position)));
    diffuseCoefficient = mix((1.0 - light_intensity), max((0.5 + light_intensity), 1.0), diffuseCoefficient);
    diffuse = clamp(diffuseCoefficient * u_light_color, mix(vec3(0.0), vec3(0.3), 1.0 - u_light_color), vec3(1.0));
    vec4 vertexLightColor = vec4(mix(tileColor.rgb, diffuseCoefficient * diffuse, 0.3), tileColor.a);
    
    vec4 vertexColor = u_enableWater == 0 ? tileColor: calculateWaterColor(tileColor, u_waterDisplacement, u_waterColor, v_uv, u_time);
    vertexColor = vec4(mix(vertexColor.rgb, vertexLightColor.rgb, 0.2), vertexColor.a);
    
    // fog
    float dist = (gl_FragCoord.z / gl_FragCoord.w);
    float visibility = (dist - u_fogStart) / u_fogRange;
    visibility = clamp(visibility, 0.0, 1.0);
    float shadowFactor = calculateShadowFactor(u_shadowMap, v_shadowCoord, 0.0005);
    vec3 vertexWithFogColor = mix(vertexColor.rgb, u_fogColor.rgb, visibility);
    gl_FragColor = vec4(mix(vec3(0.4, 0.4, 0.4), vertexWithFogColor, shadowFactor), vertexColor.a * u_opacity);
} 
  `
  + ShaderSource.waterFragment

  static rasterWithShadowVS = `
    attribute vec3 a_position;
    attribute vec2 a_uv;

    uniform mat4 u_mvpMatrix;
    uniform mat4 u_shadowMvpMatrix;

    varying vec2 v_uv;
    varying vec4 v_shadowCoord;

    void main() {
      gl_Position = u_mvpMatrix * vec4(a_position, 1.0);
      v_uv = a_uv;
      // Calculate shadow coordinate
      v_shadowCoord = u_shadowMvpMatrix * vec4(a_position, 1.0);
    }
   `

  static rasterWithShadowFS = `
    precision mediump float;
    
    // The texture
    uniform sampler2D u_texture;
    // The shadow map
    uniform sampler2D u_shadowMap;
    
    uniform sampler2D u_waterDisplacement;
    uniform sampler2D u_waterColor;
    uniform float u_time;
    uniform float u_opacity;
    uniform int u_enableWater;
 
    varying vec2 v_uv;
    varying vec4 v_shadowCoord;
    
    float calculateShadowFactor(sampler2D shadowMap, vec4 shadowCoord, float bias);
    vec4 calculateWaterColor(vec4 tileColor, sampler2D waterDispl, sampler2D waterColor, vec2 uv, float time);
    
    void main() {
      vec4 tileColor = texture2D(u_texture, v_uv);
      vec4 rasterColor = u_enableWater == 0 ? tileColor: calculateWaterColor(tileColor, u_waterDisplacement, u_waterColor, v_uv, u_time);
      float shadowFactor = calculateShadowFactor(u_shadowMap, v_shadowCoord, 0.0005);
      gl_FragColor = vec4(mix(vec3(0.4, 0.4, 0.4), rasterColor.rgb, shadowFactor), rasterColor.a * u_opacity);
    }
  `
  + ShaderSource.waterFragment

  static buildingWithShadowVS = `
    attribute vec3 a_position;
    attribute vec2 a_uv;
    attribute vec3 a_normal;

    uniform mat4 u_modelMatrix;
    uniform mat4 u_mvpMatrix;
    uniform mat4 u_shadowMvpMatrix;

    varying vec2 v_uv;
    varying vec4 v_shadowCoord;
    varying vec3 v_normal;
    varying vec3 v_position;
    
    void main() { 
      gl_Position = u_mvpMatrix * vec4(a_position, 1.0);
      v_uv = a_uv;
      // Convert normal vector to world space (make sure that we don't translate it)
      vec3 normal = normalize(vec3((u_modelMatrix * vec4(a_normal, 0.0)).xyz));
      v_position = (u_modelMatrix * vec4(a_position, 1.0)).xyz;
      v_normal = normal;
      
      // Calculate shadow coordinate
      v_shadowCoord = u_shadowMvpMatrix * vec4(a_position, 1.0); 
    }
  `

  static buildingWithShadowFS = `
    precision mediump float;

    uniform sampler2D u_texture;
    uniform sampler2D u_shadowMap;   
    uniform float u_fogStart;
    uniform float u_fogRange;
    uniform vec3 u_fogColor;
    uniform vec3 u_light_color;
    uniform vec3 u_light_position;
    uniform vec3 u_camera_direction;
    
    varying vec2 v_uv;
    varying vec4 v_shadowCoord;
    varying vec3 v_normal;
    varying vec3 v_position;
    
    float calculateShadowFactor(sampler2D shadowMap, vec4 shadowCoord, float bias);

    float calculateBias() {
      float bias;
      vec3 n = normalize(v_normal); 
      vec3 l = normalize(u_light_position);
      float cosTheta = clamp( dot( n,l ), 0.0, 1.0 );
      bias = 0.0001 * tan(acos(cosTheta));
      bias = clamp(bias, 0.0, 0.01);
      return bias;
    }
    
    vec4 calculateLightEffect(vec3 normal, vec3 light, vec3 camera, vec3 light_color, vec4 material_color);
    
    void main() {
      vec4 material_color = texture2D(u_texture, v_uv);
      float bias = calculateBias();
      float shadowFactor = 1.0;
      if (bias >= 0.01) {
        shadowFactor = 0.7;
      }
      else {
        shadowFactor = calculateShadowFactor(u_shadowMap, v_shadowCoord, bias);
      }
      
      vec4 vertexColor = calculateLightEffect(normalize(v_normal), normalize(u_light_position), normalize(u_camera_direction), u_light_color, material_color);
      
      // fog
      float distance = distance(v_position, vec3(0));
      float visibility = (distance - u_fogStart) / u_fogRange;
      visibility = clamp(visibility, 0.0, 1.0);
      vec3 vertexWithFogColor = mix(vertexColor.rgb, u_fogColor.rgb, visibility);
      
      gl_FragColor = vec4(mix(vec3(0.4, 0.4, 0.4), vertexWithFogColor, shadowFactor), material_color.a);
      
      if (gl_FragColor.a < 0.3 || visibility >= 0.5) {
        discard;
      }
    }
  ` + ShaderSource.lightEffect

  static buildingOutliningFS = `
precision mediump float;

uniform vec4 u_color;

void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
  `

  static textLabelVS = `
attribute vec2 a_position;
attribute vec2 a_uv;

uniform mat4 u_mvpMatrix;
uniform vec2 u_texsize;

varying vec2 v_uv;

void main() {
  gl_Position = u_mvpMatrix * vec4(a_position, 0.0, 1.0);
  v_uv = a_uv / u_texsize;
}
   `

  static textLabelFS = `
#define SDF_PX 8.0
precision mediump float;

uniform sampler2D u_texture;
uniform float u_pixel_scale;
uniform vec4 u_color;
uniform float u_gamma_scale;
uniform bool u_is_halo;
uniform float u_text_size;

varying vec2 v_uv;

void main() {
     lowp float dist = texture2D(u_texture, v_uv).r;
     float font_scale = u_text_size / 24.0;
     lowp float buff = (256.0 - 64.0) / 256.0;
     highp float edge_gamma = 0.105;
     highp float gamma = edge_gamma / font_scale;
     if (u_is_halo) {
       // Reduce halo width base on pixel scale (reduce ratio: 1x -> 0.25, 2x -> 0.5, 3x -> 0.75 ...)
       float haloWidthDecreaseRatio = 1.0 - (u_pixel_scale * 0.2);
       
       // float halo_width = u_pixel_scale * font_scale;
       // replace u_pixel_scale by 2.75 to increase halo width on 1x screen same as on 2.75x, if not halo on 1x screen very slim.
       float halo_width = (2.75 * font_scale) * haloWidthDecreaseRatio;
       float halo_blur = 0.01;
       gamma = (halo_blur * 1.19 / SDF_PX + edge_gamma) / (font_scale * u_gamma_scale);
       buff = (6.0 - halo_width / font_scale) / SDF_PX;
     }
     highp float alpha = smoothstep(buff - gamma, buff + gamma, dist);
     gl_FragColor = vec4(u_color.rgb, alpha * u_color.a);
}  
  `

  static tileDebugVS = `
attribute vec3 a_position;
attribute vec2 a_uv;

uniform mat4 u_mvpMatrix;

void main() {
  gl_Position = u_mvpMatrix * vec4(a_position, 1.0);
}
   `

  static tileDebugFS = `
precision mediump float;  

void main() {
    gl_FragColor = vec4(0.1, 0.2, 0.3, 1.0);
}
  `

  static collisionDebugVS = `
precision mediump float;

attribute vec2 a_position;

uniform mat4 u_mvpMatrix;

void main() {
  gl_Position = u_mvpMatrix * vec4(a_position, 0.0, 1.0);
}
  `

  static collisionDebugFS = `
precision mediump float;  

uniform vec3 u_color;

void main() {
  gl_FragColor = vec4(u_color, 1.0);
}
  `
}
