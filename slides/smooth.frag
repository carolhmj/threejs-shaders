uniform vec2 resolution;

uniform float seedX;
uniform float seedY;
uniform float multP;
uniform float coordM;

float random(vec2 uv) {
    return fract(sin(dot(uv, vec2(seedX, seedY))) * multP);
}

float noise(vec2 uv) {
    vec2 i = floor(uv);
    vec2 f = fract(uv);

    // Corners
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = smoothstep(0., 1., f);

    float ab = mix(a, b, u.x);
    float cd = mix(c, d, u.x);

    return mix(ab, cd, u.y);
}

vec3 visualizeGrid(vec2 uv) {
    vec2 i = floor(uv);
    vec2 f = fract(uv);
    
    vec3 color = vec3(0.0);
    
    if (f.x > 0.98 || f.y > 0.98) color = vec3(0.0, 0.0, 1.0);
    else color = vec3(f.x, f.y, 0.0);
    
    return color;
}

void main()
{
    vec2 uv = gl_FragCoord.xy/resolution.xy -.5;
	uv.x *= resolution.x/resolution.y;
	
	uv *= coordM;
    
    // Visualize the formed grid 
    //vec3 color = visualizeGrid(uv);
    
    // Visualize the random colors
    vec3 color = vec3(noise(uv));
    
    gl_FragColor = vec4(vec3(color), 1.0);
}