varying vec2 vUv;

uniform float time;
uniform vec2 screen;
uniform sampler2D texture1;
uniform sampler2D texture2;

void main() {
    vec2 sUv = (gl_FragCoord.xy - .5*screen.xy)/screen.y;
    float dist = length(sUv);
    float timeMask = (sin(time)+1.0)/2.0;

    vec4 color1 = texture2D(texture1, vUv);
    vec4 color2 = texture2D(texture2, vUv);

    float mask = smoothstep(timeMask, timeMask+0.01, dist);
    gl_FragColor = mix(color1, color2, mask);
}