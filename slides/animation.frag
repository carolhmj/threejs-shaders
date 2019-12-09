uniform vec2 resolution;
uniform float time;

vec3 drawCircle(vec2 uv, float radius) {
    float dist = length(uv);
    
    float r = radius;

    float mask = smoothstep(r-0.01, r, dist);
    
    vec3 color1 = vec3(0.6, 0.3, 0.1);
    vec3 color2 = vec3(0.0, 0.1, 0.3);
    
    vec3 color = mix(color1, color2, mask);

    return color;
}

void main()
{
    vec2 uv = gl_FragCoord.xy/resolution.xy -.5;
	uv.x *= resolution.x/resolution.y;
    
    float radius = 0.5;
    float mapTime = 1.0;

    // Time is a monotonically increasing variable, we want to constrain it to a range
    // sin maps the time to [-1 1] 
    //mapTime = sin(time);

    // dividing by two brings us to [-0.5 0.5]
    //mapTime /= 2.0;

    // we then add 0.5 to it to go to range [0 1]
    //mapTime += 0.5;

    radius = radius * mapTime;

    vec3 color = drawCircle(uv, radius);
    
    gl_FragColor = vec4(color, 1.0);
}