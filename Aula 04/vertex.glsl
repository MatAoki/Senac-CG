precision highp float;

attribute vec2 position;
varying vec2 positionPixel;

void main() {
	positionPixel = position;
	gl_Position = vec4(position.xy , 1.0, 1.0);
}
