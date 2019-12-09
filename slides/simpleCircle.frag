uniform vec2 resolution;

void main()
{
    vec2 uv = gl_FragCoord.xy/resolution.xy -.5;
	uv.x *= resolution.x/resolution.y;
    
   	float dist = length(uv);
    
    float r = 0.3;

    // A simple way to draw out a circle with radius r
    float color;
    if (dist < r) {
    	color = 0.0;    
    } else {
    	color = 1.0;
    }
    
    // A one liner way utilizing step
    //color = step(r, dist);
    
    // A smooth way utilizing smoothstep
    //color = smoothstep(r-0.01, r, dist);
    
    gl_FragColor = vec4(vec3(color), 1.0);
}