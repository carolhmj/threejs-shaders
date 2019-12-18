uniform vec2 resolution;
uniform float time;

uniform float seedX;
uniform float seedY;
uniform float multP;
uniform float coordM;

uniform sampler2D texture1;
uniform sampler2D texture2;

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

// Map a monotonically increasing time value to tha range 0 to 1, starting with a value of mixLevel(0) = 0;
float mixLevel(float t) {
    return sin(t-1.5)/2.0 + 0.5;
}

// Map a monotonically increasing time value to the range 0 to 1 in half the time of the mixLevel function
float noiseLevel(float t) {
    return sin(t*2.0-1.5)/2.0 + 0.5;
}

void main()
{
    vec2 uv = gl_FragCoord.xy/resolution.xy;
    vec2 tc = uv;
    
    uv -= 0.5;
	uv.x *= resolution.x/resolution.y;
	
	uv *= coordM;
	
	float slowedTime = time * 0.8;

    // Produce noise in the X coordinates
    float noiseX = noise(uv)*0.05;
    // Multiply the noise by a amount dependent on time
    noiseX *= noiseLevel(slowedTime);

    // Same in the Y coordinate
    float noiseY = noise(uv + vec2(seedX, seedY))*0.05;
    noiseY *= noiseLevel(slowedTime);

    // Sample the textures with a small displacement caused by the noise, this creats the distortion effect
    vec4 color1 = texture2D(texture1, tc + vec2(noiseX, noiseY));
    vec4 color2 = texture2D(texture2, tc + vec2(noiseX, noiseY));
        
    gl_FragColor = mix(color1, color2, mixLevel(slowedTime));
}