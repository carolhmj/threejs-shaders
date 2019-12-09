uniform vec2 resolution;

uniform float seedX;
uniform float seedY;
uniform float multP;

float random(vec2 uv) {
    return fract(sin(dot(uv, vec2(seedX, seedY))) * multP);
} 

void main()
{
    vec2 uv = gl_FragCoord.xy/resolution.xy -.5;
	uv.x *= resolution.x/resolution.y;
    
    vec3 color = vec3(random(uv));
    
    gl_FragColor = vec4(vec3(color), 1.0);
}