uniform vec2 resolution;

void main()
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy/resolution.xy;
    
    // Move the pixel coordinates to -0.5 to 0.5
    //uv -= 0.5;
    
    // Scale x by the aspect ratio
    //uv.x *= resolution.x/resolution.y;

    // Visualize the coordinates as a color
    vec3 col = vec3(length(uv));

    // Output to screen
    gl_FragColor = vec4(col,1.0);
}