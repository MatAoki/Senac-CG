precision highp float;

uniform float aspect;
uniform vec2 translation;
attribute vec2 position;
varying vec2 positionPixel;



void main() {
	positionPixel = position;
	gl_Position = vec4(position.x * aspect +translation.x, position.y+translation.y, 1.0, 1.0);

}
