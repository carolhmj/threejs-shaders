uniform vec2 resolution;

void main()
{
    vec2 uv = gl_FragCoord.xy/resolution.xy -.5;
	uv.x *= resolution.x/resolution.y;
    
   	float dist = length(uv);
    
    float r = 0.3;

    // Instead of using the result of smoothstep directly as a color, we can use it as a mask for mixing colors
    float mask = smoothstep(r-0.01, r, dist);
    
    vec3 color1 = vec3(0.6, 0.3, 0.1);
    vec3 color2 = vec3(0.0, 0.1, 0.3);
    
    vec3 color = mix(color1, color2, mask);
    
    gl_FragColor = vec4(color, 1.0);
}