uniform float time;

void main() {
    gl_FragColor = mix(vec4(1.0, 1.0, 0.0, 0.0), 
                       vec4(1.0, 0.0, 1.0, 0.0),
                       time);
}